import { Ensure } from "@/utils/ensure.js";

export function ensureFileName(name: string) {
    Ensure.exists(name, "APK_NOT_FOUND", 404);
}