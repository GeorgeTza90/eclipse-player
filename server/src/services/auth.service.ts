import bcrypt from "bcrypt";
import axios from "axios";
import { AppError } from "../errors/AppError.js";
import { authRepository } from "../repositories/auth.repository.js"
import { signToken } from "../utils/authTokens.js";
import { randomBytes, createHash } from "crypto";
import sendEmail from "../utils/sendEmail.js";


const FRONTEND_URL = process.env.FRONTEND_URL!;

export const authService = {
    async register(username?: string, email?: string, password?: string) {            
        if (!username || !email || !password) throw new AppError("VALIDATION_ERROR", 400);
        if (username.length < 2 || password.length < 8) throw new AppError("VALIDATION_ERROR", 400);
        
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const result = await authRepository.createUser(username, email, hashedPassword);                
            const user = await authRepository.findUserById(result.insertId);
            if (!user) throw new AppError("USER_NOT_FOUND", 404);

            const token = signToken(user.id);

            return { user, token };
        } catch (err: any) {            
            if (err.code === "ER_DUP_ENTRY") throw new AppError("EMAIL_EXISTS", 400); 
            throw err;
        }
    },

    async login(email?: string, password?: string) {        
        if (!email || !password) throw new AppError("VALIDATION_ERROR", 400);

        const user = await authRepository.findUserByEmail(email);
        if (!user || !user.password) throw new AppError("INVALID_CREDENTIALS", 401);

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw new AppError("INVALID_CREDENTIALS", 401);
        
        const { password: _, ...safeUser } = user;
        const token = signToken(user.id);

        return { user: safeUser, token };
    },

    async googleLogin(accessToken: string, platform: string) {        
        if (platform !== "web") throw new AppError("INVALID_PLATFORM", 400);
        const { data } = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            { headers: { Authorization: `Bearer ${accessToken}` }}
        );
        const { email, name, sub: googleId } = data;
        if (!email) throw new AppError("GOOGLE_NO_EMAIL", 400);
        
        let user = await authRepository.findUserByEmailNoPassword(email);        
        if (!user) {
            const result = await authRepository.createGoogleUser(name, email, googleId);
            user = await authRepository.findUserById(result.insertId);
            if (!user) throw new AppError("USER_NOT_FOUND", 404);
        }
        
        const token = signToken(user.id);

        return { user, token };
    },

    async forgotPassword(email?: string): Promise<void> {
        if (!email) throw new AppError("EMAIL_REQUIRED", 400);
        
        const user = await authRepository.findUserByEmailNoPassword(email);        
        if (!user) return;
        
        const minEXP = 30;
        const resetToken = randomBytes(32).toString("hex");
        const tokenHash = createHash("sha256").update(resetToken).digest("hex");        
        const expiresAt = new Date(Date.now() + minEXP * 60 * 1000).toISOString().slice(0, 19).replace("T", " ");
        
        await authRepository.createPasswordResetRequest(user.id, tokenHash, expiresAt);
        
        const resetLink = `${FRONTEND_URL}/reset-password?token=${resetToken}`;

        const html = `
            <h2>Password Reset Request</h2>
            <p>Hello ${user.username || ""},</p>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}" target="_blank">Reset Password</a>
            <p>This link expires in ${minEXP} minutes.</p>
            <br/>
            <p>If you didn’t request this, you can ignore this email.</p>
        `;
        
        await sendEmail( user.email, "Reset Your Password", html );
    },

    async changePassword(userId: number, oldPassword?: string, newPassword?: string): Promise<void> {
        if (!oldPassword || !newPassword) throw new AppError("VALIDATION_ERROR", 400);
        if (newPassword.length < 8) throw new AppError("VALIDATION_ERROR", 400);
        
        const user = await authRepository.findUserPassword(userId);

        if (!user) throw new AppError("USER_NOT_FOUND", 404);
        if (!user.password) throw new AppError("PASSWORD_LOGIN_DISABLED", 400);

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) throw new AppError("INVALID_OLD_PASSWORD", 401);
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);    
        await authRepository.updateUserPassword(hashedPassword, userId);
    },

    async resetPassword(token?: string, newPassword?: string): Promise<string> {        
        if (!token || !newPassword) throw new AppError("VALIDATION_ERROR", 400);
        if (newPassword.length < 8) throw new AppError("VALIDATION_ERROR", 400);
        
        const tokenHash = createHash("sha256").update(token).digest("hex");        
        const rows = await authRepository.findPasswordResetRequest(tokenHash);

        const request = rows[0];
        if (!request) throw new AppError("INVALID_RESET_TOKEN", 400);
        
        const user = await authRepository.findUserPassword(request.user_id);
        if (!user || !user.password) throw new AppError("USER_NOT_FOUND", 404);
        
        const samePassword = await bcrypt.compare(newPassword, user.password);
        if (samePassword) throw new AppError("SAME_PASSWORD", 400);
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        await authRepository.updateUserPasswordTransaction(request.user_id, request.id, hashedPassword);
        
        const authToken = signToken(request.user_id);
        return authToken;
    },

    async updateUsername(userId: number, newUsername?: string): Promise<string> {
        if (!newUsername) throw new AppError("VALIDATION_ERROR", 400);

        const cleanedUsername = newUsername.trim();
        if (cleanedUsername.length < 2) throw new AppError("VALIDATION_ERROR", 400);
        
        const result = await authRepository.updateUsername(cleanedUsername, userId);        
        if (result.affectedRows === 0) throw new AppError("USER_NOT_FOUND", 404);

        return cleanedUsername;
    },

    async premiumCheck(userId: number) {
        const user = await authRepository.findUserPremium(userId);
        if (!user) throw new AppError("USER_NOT_FOUND", 404);

        return { premium: Boolean(user.premium), private: Boolean(user.private)};
    },

    // GET USER DATA
    async findUserById(userId: number) {
        return await authRepository.findUserById(userId);
    },

    // PASSWORD RESET
    async logPasswordResetRequest(userId: number, token: string, expireDate: string) {
        await authRepository.createPasswordResetRequest(userId, token, expireDate);
    },

    async getPasswordResetRequest(token: string) {
        return await authRepository.findPasswordResetRequest(token);
    },

    async resetUserPassword(userId: number, requestId: number, password: string) {
        return await authRepository.updateUserPasswordTransaction(userId, requestId, password);
    },
}