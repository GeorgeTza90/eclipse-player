import { ResultSetHeader } from "mysql2";
import { PasswordResetTypes, User } from "../types/auth.types.js";
import { Ensure } from "../utils/ensure.js";

export function ensureUserExists(user: User | null): asserts user is User {
    Ensure.exists(user, "USER_NOT_FOUND", 404);
}

export function ensureUsername(username?: string): asserts username is string {
    Ensure.exists(username, "VALIDATION_ERROR", 400);
}

export function ensureEmail(email?: string): asserts email is string {
    Ensure.exists(email, "VALIDATION_ERROR", 400);
}

export function ensureGoogleEmail(email?: string): asserts email is string {
    Ensure.exists(email, "GOOGLE_NO_EMAIL", 400);
}

export function ensurePassword(password?: string): asserts password is string {
    Ensure.exists(password, "VALIDATION_ERROR", 400);
}

export function ensureToken(token?: string): asserts token is string {
    Ensure.exists(token, "VALIDATION_ERROR", 400);
}

export function ensureRequest(request: PasswordResetTypes | undefined): asserts request is PasswordResetTypes {
    Ensure.exists(request, "INVALID_RESET_TOKEN", 400);
}

export function ensureUserAuthorized(user: User | null): asserts user is User {
    Ensure.that(!!user?.private, "USER_NOT_AUTHORIZED", 403);
}

export function ensureUserPassword(user: User | null): asserts user is User {
    Ensure.that(!!user?.password, "PASSWORD_LOGIN_DISABLED", 400);
}

export function ensureUsernameLength(username: string, min: number): void {
    Ensure.that(username.length >= min, "VALIDATION_ERROR", 400);
}

export function ensureCredentialsMatch(isMatch: boolean): void {
    Ensure.that(isMatch, "INVALID_CREDENTIALS", 401);
}

export function ensurePasswordMatch(isMatch: boolean): void {
    Ensure.that(isMatch, "INVALID_OLD_PASSWORD", 401);
}

export function ensurePasswordDontMatch(isMatch: boolean): void {
    Ensure.that(!isMatch, "PASSWORD_ALREADY_USED", 400);
}

export function ensurePasswordLength(password: string, min: number): void {
    Ensure.that(password.length >= min, "VALIDATION_ERROR", 400);
}

export function ensurePlatform(platform: string): void {
    Ensure.that(platform === "web" || platform === "mobile", "INVALID_PLATFORM", 400);
}

export function ensureEmailUniqueConstraint(errorCode?: string): void {
    Ensure.that(errorCode !== "ER_DUP_ENTRY", "EMAIL_EXISTS", 400);
}

export function ensureResult(result: ResultSetHeader): void {
    Ensure.that(result.affectedRows > 0, "USER_NOT_FOUND", 404);
}