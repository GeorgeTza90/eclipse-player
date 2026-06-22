import path from "path";
import { AppError } from "../errors/AppError.js";

const APKS = {
    "1.2.8": "eclipse_player_v1.2.8.apk",
    "1.2.9": "eclipse_player_v1.2.9.apk",
} as const;

export const apkService = {
    getApkPath(version?: string): string {
        const v = version ?? "1.2.8";
        const fileName = APKS[v as keyof typeof APKS];
        if (!fileName) throw new AppError("APK_NOT_FOUND", 404);
        return path.resolve("files", fileName);
    }
};