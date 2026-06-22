import { AppError } from "../errors/AppError.js";
import { ResultSetHeader } from "mysql2";
import { PasswordResetTypes, User } from "../types/auth.types.js";

export function ensureUserExists(user: User | null): asserts user is User {
    if (!user) throw new AppError("USER_NOT_FOUND", 404);
}

export function ensureUserAuthorized(user: User | null): asserts user is User {
    if (!user?.private) throw new AppError("USER_NOT_AUTHORIZED", 403);
}

export function ensureUserPassword(user: User | null): asserts user is User {
    if (!user?.password) throw new AppError("PASSWORD_LOGIN_DISABLED", 400);
}

export function ensureUsername(username?: string): asserts username is string {
    if (!username) throw new AppError("VALIDATION_ERROR", 400);
}

export function ensureUsernameLength(username: string, length: number) {
    if (username.length < length) throw new AppError("VALIDATION_ERROR", 400);
}

export function ensureEmail(email?: string): asserts email is string {
    if (!email) throw new AppError("VALIDATION_ERROR", 400);
}

export function ensureGoogleEmail(gmail?: string): asserts gmail is string {
    if (!gmail) throw new AppError("GOOGLE_NO_EMAIL", 400);
}

export function ensurePassword(password?: string): asserts password is string {
    if (!password) throw new AppError("VALIDATION_ERROR", 400);
}

export function ensurePasswordLength(password: string, length: number): asserts password is string {
    if (password.length < length) throw new AppError("VALIDATION_ERROR", 400);
}

export function ensurePasswordMatch(isMatch: boolean) {
    if (!isMatch) throw new AppError("INVALID_OLD_PASSWORD", 401);
}

export function ensurePasswordDontMatch(isMatch: boolean) {
    if (!isMatch) throw new AppError("INVALID_OLD_PASSWORD", 401);
}

export function ensureToken(token?: string): asserts token is string {
    if (!token) throw new AppError("VALIDATION_ERROR", 400);
}

export function ensurePlatform(platform: string) {
    if (platform !== "web" && platform !== "mobile" ) throw new AppError("INVALID_PLATFORM", 400);
}

export function ensureRequest(request: ResultSetHeader | PasswordResetTypes) {
    if (!request) throw new AppError("INVALID_REQUEST", 400);
}