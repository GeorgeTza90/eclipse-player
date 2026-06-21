import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/controllers.types.js";
import { authService } from "../services/auth.service.js";
import { clearAuthCookie, setAuthCookie } from "../utils/authCoockie.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";

// -----------------------------
// ME
// -----------------------------
export const me = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;    
    const user = await authService.findUserById(userId);
    res.json(user);
});

// -----------------------------
// Register
// -----------------------------
export const register = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const { user, token } = await authService.register(username, email, password);
    setAuthCookie(res, token);
    res.json({ user, token });
});

// -----------------------------
// Login
// -----------------------------
export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    setAuthCookie(res, token);
    res.json({ user, token });
});

// -----------------------------
// Google Login
// -----------------------------
export const googleLogin = asyncHandler(async (req: Request, res: Response) => {
    // test

    console.log(await bcrypt.hash("anything-at-all", 10));

    for (const cost of [10, 11, 12]) {
        const start = Date.now();
        await bcrypt.hash("test-password", cost);
        console.log(`cost ${cost}: ${Date.now() - start}ms`);
    }

    const { accessToken, platform } = req.body;
    const { user, token } = await authService.googleLogin(accessToken, platform);
    setAuthCookie(res, token);
    res.json({ user, token });
});

// -----------------------------
// LogOut
// -----------------------------
export const logout = (_req: Request, res: Response) => {
    clearAuthCookie(res);
    res.json({ message: "Logged out successfully" });
};

// -----------------------------
// Forgot Password
// -----------------------------
export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    await authService.forgotPassword(email);
    res.json({ message: "If this email exists, a reset link has been sent" });
});

// -----------------------------
// Change Password (logged-in users)
// -----------------------------
export const changePassword = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;    
    const { oldPassword, newPassword } = req.body;
    await authService.changePassword(userId, oldPassword, newPassword);
    res.json({ message: "Password changed successfully" });
});

// -----------------------------
// Reset Password
// -----------------------------
export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;
    const authToken = await authService.resetPassword(token, newPassword);
    setAuthCookie(res, authToken);
    res.json({ message: "Password reset successful" });
});

// -----------------------------
// Update Username
// -----------------------------
export const updateUsername = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;    
    const { newUsername } = req.body;
    const username = await authService.updateUsername(userId, newUsername);
    res.json({ success: true, message: "Username update successful", username });
});

// -----------------------------
// Premium Check
// -----------------------------
export const premiumCheck = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;    
    const status = await authService.premiumCheck(userId);
    res.json({ success: true, status });
});