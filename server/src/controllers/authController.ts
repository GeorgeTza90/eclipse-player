import { Request, Response } from "express";
import { User, AuthenticatedRequest } from "../types/controllersTypes.js";
import { randomBytes, createHash } from "crypto";
import { authService } from "../services/authService.js";
import { logger } from "../utils/logger.js";
import axios from "axios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

// -----------------------------
// ENVIORONMENT VARS
// -----------------------------
const JWT_SECRET = process.env.JWT_SECRET!;
const FRONTEND_URL = process.env.FRONTEND_URL!;
const RESET_SECRET = process.env.RESET_PASSWORD_SECRET!;
const isProd = process.env.NODE_ENV === "production";

// -----------------------------
// ME
// -----------------------------
export const me = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id
    if (!userId) { res.status(401).json({ error: "Not authenticated" }); return; }

    try {
        const user = await authService.findUserById(userId);        
        if (!user) { res.status(404).json({ error: "User not found" }); return; }

        res.json(user);
    } catch (error) {        
        res.status(500).json({ error: "Internal server error" });
    }
};

// -----------------------------
// REGISTER
// -----------------------------
export const register = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body as { username?: string; email?: string; password?: string; };

    if (!username || !email || !password) { res.status(400).json({ error: "Email, password and username are required" }); return; }
    if (username.length < 2) { res.status(400).json({ error: "Username must be at least 2 characters long" }); return; }
    if (password.length < 8) { res.status(400).json({ error: "Password must be at least 8 characters long" }); return; }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await authService.registerUser(username,email, hashedPassword);
        const userId = result.insertId;

        const user = await authService.findUserById(userId);
        if (!user) { res.status(404).json({ error: "User not found"}); return;}
        
        const token = jwt.sign( { id: user.id }, JWT_SECRET, { expiresIn: "7d" } );

        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 7*24*60*60*1000 });
        res.json({ user, token });
    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") { res.status(400).json({ error: "Email already in use" }); return; }        
        res.status(500).json({ error: "Ooops something went wrong. Please try again later." });
    }
};

// -----------------------------
// Login
// -----------------------------
export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) { res.status(400).json({ error: "Email and password are required" }); return; }

    try {
        const user = await authService.findUserByEmail(email);        
        if (!user) { res.status(401).json({ error: "Invalid credentials" }); return; }

        const passwordMatch = await bcrypt.compare(password, user.password!);
        if (!passwordMatch) { res.status(401).json({ error: "Invalid credentials" }); return; }
        
        const token = jwt.sign( { id: user.id }, JWT_SECRET, { expiresIn: "7d" } );
        const { password: _, ...safeUser } = user;

        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 7*24*60*60*1000 });
        res.json({ user: safeUser, token });
    } catch (error) {        
        res.status(500).json({ error: "Ooops something went wrong. Please try again later." });
    }
};

// -----------------------------
// Google Login
// -----------------------------
export const googleLogin = async (req: Request, res: Response): Promise<void> => {
    const { accessToken, platform } = req.body as { accessToken?: string; platform?: string };
    if (!accessToken) { res.status(400).json({ error: "Access token is required" }); return; }
    if (!platform || platform !== "web") { res.status(400).json({ error: "Invalid or missing platform" }); return; }

    try {
        const { data } = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", { headers: { Authorization: `Bearer ${accessToken}` } });
        const { email, name, sub: googleId } = data;
        if (!email) { res.status(400).json({ error: "Google account has no email"}); return; }
        const existingUser = await authService.findUserByEmailNoPassword(email);
        let finalUser: User;

        if (existingUser) {
          finalUser = existingUser;
        } else {
          const result = await authService.registerGoogleUser(name, email, googleId)
          const userId = result.insertId;
          const user = await authService.findUserById(userId);
          if (!user) { res.status(404).json({ error: "User Not found" }); return;}
          finalUser = user;
        }

        const token = jwt.sign( { id: finalUser.id }, JWT_SECRET, { expiresIn: "7d" } );
        
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 7*24*60*60*1000 });
        res.json({ user: finalUser, token });
    } catch (error: any) {
        console.error("Google login error:", error.response?.data || error);
        res.status(400).json({ error: "Google login failed" });
    }
};

// -----------------------------
// LogOut
// -----------------------------
export const logout = (_req: Request, res: Response) => {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none", path: "/" });
    res.json({ message: "Logged out successfully" });    
};

// -----------------------------
// Forgot Password
// -----------------------------
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body as { email?: string };
    if (!email) { res.status(400).json({ error: "Email is required" }); return; }
      
    try {
        const user = await authService.findUserByEmailNoPassword(email);
        if (!user) { res.json({ message: "If this email exists, a reset link has been sent" }); return; }
         
        const minEXP = 30;
        const resetToken = randomBytes(32).toString("hex");
        const tokenHash = createHash("sha256").update(resetToken).digest("hex");        
        const expiresAt = new Date(Date.now() + minEXP * 60 * 1000).toISOString().slice(0, 19).replace("T", " ");
                
        await authService.logPasswordResetRequest(user.id, tokenHash, expiresAt);

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

        try {            
            await sendEmail(user.email, "Reset Your Password", html);            
        } catch (emailErr) {
            logger.error("Email send failed:", {emailErr});
        }

        res.json({ message: "If this email exists, a reset link has been sent" });
    } catch (error) {        
        res.status(500).json({ error: "Something went wrong" });
    }
};

// -----------------------------
// Change Password (logged-in users)
// -----------------------------
export const changePassword = async ( req: AuthenticatedRequest, res: Response ): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

    const { oldPassword, newPassword } = req.body as { oldPassword?: string; newPassword?: string; };    
    if (!oldPassword || !newPassword) { res.status(400).json({ error: "Old and new passwords are required" }); return; }
    if (newPassword.length < 8) { res.status(400).json({ error: "New password must be at least 8 characters long" }); return; }

    try {
        const user = await authService.findUserPassword(userId);        
        if (!user) { res.status(404).json({ error: "User not found" }); return; }
        if (!user.password) { res.status(400).json({ error: "Password login not enabled for this account" }); return; }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) { res.status(401).json({ error: "Incorrect old password" }); return; }

        const hashed = await bcrypt.hash(newPassword, 10);
        await authService.updateUserPassword(hashed, userId);        

        res.json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ error: "Something went wrong. Please try again later." });
    }
};

// -----------------------------
// Reset Password
// -----------------------------
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { token, newPassword } = req.body as { token?: string; newPassword?: string };
    if (!token || !newPassword) { res.status(400).json({ error: "Token and new password are required" }); return; }
    if (newPassword.length < 8) { res.status(400).json({ error: "Password must be at least 8 characters long" }); return; }

    try {
        const tokenHash = createHash("sha256").update(token).digest("hex");
        const rows = await authService.getPasswordResetRequest(tokenHash);        
        const request = rows[0];
        if (!request) { res.status(400).json({ error: "Invalid or expired token" }); return; }

        const userId = request.user_id;
        if (!userId) { res.status(404).json({ error: "User not found" }); return; }

        const user = await authService.findUserPassword(userId);        
        if (!user || !user.password) { res.status(404).json({ error: "User not found" }); return; }

        const samePassword = await bcrypt.compare(newPassword, user.password);
        if (samePassword) { res.status(400).json({ error: "New password cannot be the same as the old password" }); return; }

        const hashed = await bcrypt.hash(newPassword, 10);        
        await authService.resetUserPassword(request.user_id, request.id, hashed)

        const newToken = jwt.sign( { id: request.user_id }, JWT_SECRET, { expiresIn: "7d" } );

        res.cookie("token", newToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 7 * 24 * 60 * 60 * 1000, });
        res.json({ message: "Password reset successful" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// -----------------------------
// Update Username
// -----------------------------
export const updateUsername = async (req: AuthenticatedRequest , res: Response): Promise<void> => {    
    const userId = req.user?.id;
    if (!userId) { res.status(401).json({ error: "Unauthorized"  }); return; }

    const { newUsername } = req.body as { newUsername?: string };    
    if (!newUsername) { res.status(400).json({ error: "A new username are required" }); return; }
    const cleanedUsername = newUsername.trim();
    if (cleanedUsername.length < 2) { res.status(400).json({ error: "Username must be at least 2 characters long" }); return; }    

    try {    
        const result = await authService.updateUsername(cleanedUsername, userId);         
        if (result.affectedRows === 0) { res.status(404).json({ error: "User not found" }); return; }        
        
        res.json({ success: true, message: "Username update successful", username: cleanedUsername });
    } catch (error) {
        console.error("Error updating username:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// -----------------------------
// Premium Check
// -----------------------------
export const premiumCheck = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {        
        const userId = req.user?.id;
        if (!userId) {res.status(401).json({ error: "Unauthorized" }); return; }

        const rows = await authService.findUserPremium(userId);
        const user = rows[0];
        if (!user) { res.status(404).json({ error: "User not found" }); return; }

        const status = { premium: Boolean(user.premium), private: Boolean(user.private) };
        res.json({ success: true, status });
    } catch (error) {        
        res.status(500).json({ error: "Internal server error" });
    }
};

