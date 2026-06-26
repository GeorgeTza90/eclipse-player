import { User } from "../types/auth.types.js";
import { Ensure } from "../utils/ensure.js";

export function ensureUserExists(user: User | null): asserts user is User {
    Ensure.exists(!user, "USER_NOT_FOUND", 404);
}

export function ensureUserAuthorized(user: User | null): asserts user is User {
    Ensure.exists(!user?.private, "USER_NOT_AUTHORIZED", 403);
}