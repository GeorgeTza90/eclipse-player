import { z } from "zod";

const usernamePattern = /^[a-zA-Z0-9_.-]+$/;

export const registerSchema = z.object({
    username: z.string().min(2).max(30)
        .regex(usernamePattern,
            "Username can only contain letters, numbers, underscores, periods, and hyphens"),
    email: z.email(),
    password: z.string().min(8),
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1),
});

export const googleLoginSchema = z.object({
    accessToken: z.string().min(1),
    platform: z.enum(["web"]).optional(),
});

export const changePasswordSchema = z.object({
    oldPassword: z.string().min(1),
    newPassword: z.string().min(8),
});

export const resetPasswordSchema = z.object({
    token: z.string().min(10),
    newPassword: z.string().min(8),
});

export const forgotPasswordSchema = z.object({
    email: z.email(),
});

export const updateUsernameSchema = z.object({
    newUsername: z.string().min(2).max(30)
        .regex(usernamePattern,
            "Username can only contain letters, numbers, underscores, periods, and hyphens"),
});