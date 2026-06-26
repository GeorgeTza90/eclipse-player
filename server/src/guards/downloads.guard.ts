import { Ensure } from "../utils/ensure.js";

export function ensurefileName(name: string) {
    Ensure.exists(name, "APK_NOT_FOUND", 404);
}