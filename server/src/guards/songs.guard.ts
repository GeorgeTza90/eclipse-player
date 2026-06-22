import { AppError } from "../errors/AppError.js";
import { User } from "../types/auth.types.js";

export function ensureUserExists(user: User | null): asserts user is User {
    if (!user) throw new AppError("USER_NOT_FOUND", 404);
}

export function ensureUserAuthorized(user: User | null): asserts user is User {
    if (!user?.private) throw new AppError("USER_NOT_AUTHORIZED", 403);
}