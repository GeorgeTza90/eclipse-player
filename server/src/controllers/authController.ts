import { Request, Response } from "express";
import axios from "axios";
import db from "../db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { User, AuthenticatedRequest } from "../types/controllersTypes";

// -----------------------------
// ENVIORONMENT VARS
// -----------------------------
const JWT_SECRET = process.env.JWT_SECRET!;
const RESET_SECRET = process.env.RESET_PASSWORD_SECRET!;
const FRONTEND_URL = process.env.FRONTEND_URL!;

// -----------------------------
// REGISTER
// -----------------------------
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body as {
    username?: string;
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({ error: "Password must be at least 8 characters long" });
    return;
  }

  try {
    const [existingRows] = await db.query<User[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingRows.length > 0) {
      res.status(400).json({ error: "Email already in use" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    const userId = result.insertId;

    const [userRows] = await db.query<User[]>(
      "SELECT id, username, email, premium FROM users WHERE id = ?",
      [userId]
    );
    const user = userRows[0];

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username, premium: user.premium },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ user, token });
  } catch (error) {
    console.error("Server Error - on Register:", error);
    res.status(500).json({ error: "Ooops something went wrong. Please try again later." });
  }
};

// -----------------------------
// Login
// -----------------------------
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  try {
    const [rows] = await db.query<User[]>("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password!);
    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username, premium: user.premium },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ user: { id: user.id, username: user.username, email: user.email, premium: user.premium }, token });
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

  if (!accessToken) {
    res.status(400).json({ error: "Access token is required" });
    return;
  }
  if (!platform || platform !== "web") {
    res.status(400).json({ error: "Invalid or missing platform" });
    return;
  }

  try {
    const { data } = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const { email, name, sub: googleId } = data;
    const [rows] = await db.query<User[]>("SELECT id, username, email, premium FROM users WHERE email = ?", [email]);
    let user: User;

    if (rows.length > 0) {
      user = rows[0];
    } else {
      const [result] = await db.query<ResultSetHeader>(
        "INSERT INTO users (username, email, google_id, password) VALUES (?, ?, ?, ?)",
        [name, email, googleId, null]
      );
      const userId = result.insertId;
      const [userRows] = await db.query<User[]>("SELECT id, username, email, premium FROM users WHERE id = ?", [userId]);
      user = userRows[0];
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username, premium: user.premium },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ user, token });
  } catch (error: any) {
    console.error("Google login error:", error.response?.data || error);
    res.status(400).json({ error: "Google login failed" });
  }
};

// -----------------------------
// Forgot Password
// -----------------------------
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body as { email?: string };

  if (!email) {
    res.status(400).json({ error: "Email is required" });
    return;
  }

  try {
    const [rows] = await db.query<User[]>("SELECT id, email, username FROM users WHERE email = ?", [email]);
    const user = rows[0];

    if (!user) {
      res.json({ message: "If this email exists, a reset link has been sent" });
      return;
    }

    const resetToken = jwt.sign({ id: user.id, email: user.email }, RESET_SECRET, { expiresIn: "15m" });
    const resetLink = `${FRONTEND_URL}/reset-password?token=${resetToken}`;

    const html = `
      <h2>Password Reset Request</h2>
      <p>Hello ${user.username || ""},</p>
      <p>You requested to reset your password. Click the link below to reset it:</p>
      <a href="${resetLink}" target="_blank">Reset Password</a>
      <p>This link expires in 15 minutes.</p>
      <br/>
      <p>If you didn’t request this, you can safely ignore this email.</p>
    `;

    try {
      await sendEmail(user.email, "Reset Your Password", html);
    } catch (emailErr) {
      console.error("Failed to send reset email:", emailErr);
    }

    res.json({ message: "If this email exists, a reset link has been sent" });
  } catch (error) {
    console.error("Server Error - on Forgot Password:", error);
    res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
};

// -----------------------------
// Change Password (logged-in users)
// -----------------------------
export const changePassword = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  const { oldPassword, newPassword } = req.body as { oldPassword?: string; newPassword?: string };

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (!oldPassword || !newPassword) {
    res.status(400).json({ error: "Old and new passwords are required" });
    return;
  }

  if (newPassword.length < 8) {
    res.status(400).json({ error: "New password must be at least 8 characters long" });
    return;
  }

  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT password FROM users WHERE id = ?",
      [userId]
    );
    const user = rows[0] as { password: string };

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Incorrect old password" });
      return;
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query<ResultSetHeader>("UPDATE users SET password = ? WHERE id = ?", [hashed, userId]);

    res.json({ message: "Password changed successfully" });
    return;
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Something went wrong. Please try again later." });
    return;
  }
};


// -----------------------------
// Reset Password
// -----------------------------
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { token, newPassword } = req.body as { token?: string; newPassword?: string };

  if (!token || !newPassword) {
    res.status(400).json({ error: "Token and new password are required" });
    return;
  }
  if (newPassword.length < 8) {
    res.status(400).json({ error: "Password must be at least 8 characters long" });
    return;
  }

  try {
    const decoded = jwt.verify(token, RESET_SECRET) as { id: number; email: string };
    const userId = decoded.id;

    const [rows] = await db.query<User[]>(
      "SELECT id, username, email, premium FROM users WHERE id = ?",
      [userId]
    );
    const user = rows[0];

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query<ResultSetHeader>("UPDATE users SET password = ? WHERE id = ?", [hashed, userId]);

    const newToken = jwt.sign(
      { id: user.id, email: user.email, username: user.username, premium: user.premium },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Password reset successful", user, token: newToken });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(400).json({ error: "Invalid or expired token" });
  }
};
