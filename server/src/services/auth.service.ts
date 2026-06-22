import bcrypt from "bcrypt";
import axios from "axios";
import { randomBytes, createHash } from "crypto";
import { AppError } from "../errors/AppError.js";
import { authRepository } from "../repositories/auth.repository.js"
import { signToken } from "../utils/authTokens.js";
import { FRONTEND_URL, DUMMY_HASH } from "../config/env.js";
import { resetEmailHtml } from "../templates/resetPassword.email.js";
import sendEmail from "../utils/sendEmail.js";
import {
    ensureUsername, ensureEmail, ensurePassword, ensureUserExists, ensurePlatform,
    ensureGoogleEmail, ensurePasswordLength, ensureUserPassword, ensurePasswordMatch,
    ensureToken, ensureRequest, ensurePasswordDontMatch, ensureUsernameLength
} from "../guards/auth.guard.js";

export const authService = {
    async register(username?: string, email?: string, password?: string) {            
        ensureUsername(username);
        ensureEmail(email);
        ensurePassword(password);
        
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const result = await authRepository.createUser(username, email, hashedPassword);                
            const user = await authRepository.findUserById(result.insertId);
            ensureUserExists(user);

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
        const hashToCheck = user?.password ?? DUMMY_HASH;
        const passwordMatch = await bcrypt.compare(password, hashToCheck);
        if (!user || !user.password || !passwordMatch) throw new AppError("INVALID_CREDENTIALS", 401);        
        
        const { password: _, ...safeUser } = user;
        const token = signToken(user.id);

        return { user: safeUser, token };
    },

    async googleLogin(accessToken: string, platform: string) {        
        ensurePlatform(platform);
        let data;
        try {
            const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            data = res.data;
        } catch {
            throw new AppError("INVALID_GOOGLE_TOKEN", 401);
        }
        
        const { email, name, sub: googleId } = data;
        ensureGoogleEmail(email);        
        
        let user = await authRepository.findUserByEmailNoPassword(email);
        if (!user) {
            const result = await authRepository.createGoogleUser(name, email, googleId);
            user = await authRepository.findUserById(result.insertId);
            ensureUserExists(user);            
        }
        
        const token = signToken(user.id);

        return { user, token };
    },

    async forgotPassword(email?: string): Promise<void> {
        ensureEmail(email);     
        
        const user = await authRepository.findUserByEmailNoPassword(email);        
        if (!user) return;
        
        const minEXP = 30;
        const resetToken = randomBytes(32).toString("hex");
        const tokenHash = createHash("sha256").update(resetToken).digest("hex");        
        const expiresAt = new Date(Date.now() + minEXP * 60 * 1000).toISOString().slice(0, 19).replace("T", " ");
        
        await authRepository.createPasswordResetRequest(user.id, tokenHash, expiresAt);
        
        const resetLink = `${FRONTEND_URL}/reset-password?token=${resetToken}`;
        const html = resetEmailHtml(user.username, resetLink, minEXP);
        
        await sendEmail( user.email, "Reset Your Password", html );
    },

    async changePassword(userId: number, oldPassword?: string, newPassword?: string): Promise<void> {
        ensurePassword(oldPassword);
        ensurePassword(newPassword);
        ensurePasswordLength(newPassword, 8);
        
        const user = await authRepository.findUserPassword(userId);
        ensureUserExists(user);
        ensureUserPassword(user);

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        ensurePasswordMatch(isMatch);        
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);    
        await authRepository.updateUserPassword(hashedPassword, userId);
    },

    async resetPassword(token?: string, newPassword?: string): Promise<string> {
        ensureToken(token);
        ensurePassword(newPassword);
        ensurePasswordLength(newPassword, 8);        
        
        const tokenHash = createHash("sha256").update(token).digest("hex");        
        const rows = await authRepository.findPasswordResetRequest(tokenHash);

        const request = rows[0];
        ensureRequest(request);        
        
        const user = await authRepository.findUserPassword(request.user_id);
        ensureUserExists(user);
        ensureUserPassword(user);        
        
        const samePassword = await bcrypt.compare(newPassword, user.password);
        ensurePasswordDontMatch(samePassword);        
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        await authRepository.updateUserPasswordTransaction(request.user_id, request.id, hashedPassword);
        
        const authToken = signToken(request.user_id);
        return authToken;
    },

    async updateUsername(userId: number, newUsername?: string): Promise<string> {
        ensureUsername(newUsername);        

        const cleanedUsername = newUsername.trim();
        ensureUsernameLength(cleanedUsername, 2)        
        
        const result = await authRepository.updateUsername(cleanedUsername, userId);
        if (result.affectedRows === 0) throw new AppError("USER_NOT_FOUND", 404);

        return cleanedUsername;
    },

    async premiumCheck(userId: number) {
        const user = await authRepository.findUserPremium(userId);
        if (!user) throw new AppError("USER_NOT_FOUND", 404);

        return { premium: Boolean(user.premium), private: Boolean(user.private)};
    },
    
    async findUserById(userId: number) {
        return await authRepository.findUserById(userId);
    },
}