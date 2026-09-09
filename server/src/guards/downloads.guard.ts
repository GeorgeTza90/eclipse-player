import { Ensure } from "@/utils/ensure.js";

export function ensureFileName(name: string) {
    Ensure.exists(name, "FILE_NOT_FOUND", 404);
}