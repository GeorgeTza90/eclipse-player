import { Request, Response } from "express";
import { ResultSetHeader } from "mysql2";
import { User, AuthenticatedRequest } from "../types/controllersTypes.js";
import { randomBytes, createHash } from "crypto";
import axios from "axios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db/db.js";
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
    if (!req.user) { res.status(401).json({ error: "Not authenticated" }); return; }

    try {
        const [userRows] = await db.query<User[]>("SELECT username, email, premium, private FROM users WHERE id = ?", [req.user.id]);
        const user = userRows[0];
        if (!user) { res.status(404).json({ error: "User not found" }); return; }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
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
        const [result] = await db.query<ResultSetHeader>("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword]);
        const userId = result.insertId;

        const [userRows] = await db.query<User[]>("SELECT id, username, email, premium, private FROM users WHERE id = ?", [userId]);
        const user = userRows[0];
        const token = jwt.sign( { id: user.id }, JWT_SECRET, { expiresIn: "7d" } );

        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 7*24*60*60*1000 });
        res.json({ user, token });
    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") { res.status(400).json({ error: "Email already in use" }); return; }
        console.error("Server Error - on Register:", error);
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
        const [rows] = await db.query<User[]>("SELECT id, username, email, password, premium, private FROM users WHERE email = ?", [email]);
        const user = rows[0];
        if (!user) { res.status(401).json({ error: "Invalid credentials" }); return; }

        const passwordMatch = await bcrypt.compare(password, user.password!);
        if (!passwordMatch) { res.status(401).json({ error: "Invalid credentials" }); return; }
        const token = jwt.sign( { id: user.id }, JWT_SECRET, { expiresIn: "7d" } );
        const { password: _, ...safeUser } = user;

        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 7*24*60*60*1000 });
        res.json({ user: safeUser, token });
    } catch (error) {
        console.error("Server Error - on Login:", error);
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
        const [rows] = await db.query<User[]>("SELECT id, username, email, premium, private FROM users WHERE email = ?", [email]);
        let user: User;

        if (rows.length > 0) {
          user = rows[0];
        } else {
          const [result] = await db.query<ResultSetHeader>("INSERT INTO users (username, email, google_id, password) VALUES (?, ?, ?, ?)", [name, email, googleId, null]);
          const userId = result.insertId;
          const [userRows] = await db.query<User[]>("SELECT id, username, email, premium, private FROM users WHERE id = ?", [userId]);
          user = userRows[0];
        }

        const token = jwt.sign( { id: user.id }, JWT_SECRET, { expiresIn: "7d" } );
        
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 7*24*60*60*1000 });
        res.json({ user, token });
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
        const [rows] = await db.query<User[]>("SELECT id, email, username FROM users WHERE email = ?", [email]);
        const user = rows[0];        
        if (!user) { res.json({ message: "If this email exists, a reset link has been sent" }); return; }
        
        const minEXP = 30;
        const resetToken = randomBytes(32).toString("hex");
        const tokenHash = createHash("sha256").update(resetToken).digest("hex");        
        const expiresAt = new Date(Date.now() + minEXP * 60 * 1000).toISOString().slice(0, 19).replace("T", " ");
        
        await db.query(`INSERT INTO password_reset_requests (user_id, token_hash, expires_at) VALUES (?, ?, ?)`, [user.id, tokenHash, expiresAt]);
        
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
            console.error("Email send failed:", emailErr);
        }

        res.json({ message: "If this email exists, a reset link has been sent" });
    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// -----------------------------
// Change Password (logged-in users)
// -----------------------------
export const changePassword = async ( req: AuthenticatedRequest, res: Response ): Promise<void> => {
    const userId = req.user?.id;
    const { oldPassword, newPassword } = req.body as { oldPassword?: string; newPassword?: string; };

    if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }
    if (!oldPassword || !newPassword) { res.status(400).json({ error: "Old and new passwords are required" }); return; }
    if (newPassword.length < 8) { res.status(400).json({ error: "New password must be at least 8 characters long" }); return; }

    try {
        const [rows] = await db.query<User[]>("SELECT password FROM users WHERE id = ?", [userId] );
        const user = rows[0];
        if (!user) { res.status(404).json({ error: "User not found" }); return; }
        if (!user.password) { res.status(400).json({ error: "Password login not enabled for this account" }); return; }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) { res.status(401).json({ error: "Incorrect old password" }); return; }

        const hashed = await bcrypt.hash(newPassword, 10);
        await db.query<ResultSetHeader>("UPDATE users SET password = ? WHERE id = ?", [hashed, userId]);

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
        const [rows] = await db.query<any[]>(`SELECT *  FROM password_reset_requests  WHERE token_hash = ?  AND expires_at > NOW()  AND used_at IS NULL`, [tokenHash]);
        const request = rows[0];
        if (!request) { res.status(400).json({ error: "Invalid or expired token" }); return; }

        const [userRows] = await db.query<User[]>("SELECT password FROM users WHERE id = ?", [request.user_id]);
        const user = userRows[0];
        if (!user || !user.password) { res.status(404).json({ error: "User not found" }); return; }

        const samePassword = await bcrypt.compare(newPassword, user.password);
        if (samePassword) { res.status(400).json({ error: "New password cannot be the same as the old password" }); return; }

        const hashed = await bcrypt.hash(newPassword, 10);
        
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();
            await conn.query("UPDATE users SET password = ? WHERE id = ?", [hashed, request.user_id]);
            await conn.query("UPDATE password_reset_requests SET used_at = NOW() WHERE id = ?", [request.id]);
            await conn.commit();
        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }

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
    const userID = req.user?.id;
    if (!userID) { res.status(401).json({ error: "Unauthorized"  }); return; }

    const { newUsername } = req.body as { newUsername?: string };    
    if (!newUsername) { res.status(400).json({ error: "A new username are required" }); return; }
    const cleanedUsername = newUsername.trim();
    if (cleanedUsername.length < 2) { res.status(400).json({ error: "Username must be at least 2 characters long" }); return; }    

    try {    
        const [result] = await db.query<ResultSetHeader>("UPDATE users SET username = ? WHERE id = ?", [cleanedUsername, userID]);        
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
        const userID = req.user?.id;
        if (!userID) {res.status(401).json({ error: "Unauthorized" }); return; }

        const [rows] = await db.query<any[]>("SELECT premium, private FROM users WHERE id = ?", [userID]);
        const user = rows[0];
        if (!user) { res.status(404).json({ error: "User not found" }); return; }

        const status = { premium: Boolean(user.premium), private: Boolean(user.private) };
        res.json({ success: true, status });
    } catch (error) {
        console.error("Error on checking:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

