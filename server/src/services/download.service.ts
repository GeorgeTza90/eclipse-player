import path from "path";
import { ensurefileName } from "../guards/downloads.guard.js";

const APKS = {
    "1.2.8": "eclipse_player_v1.2.8.apk",
    "1.2.9": "eclipse_player_v1.2.9.apk",
} as const;

export const apkService = {
    getApkPath(version?: string): string {
        const v = version ?? "1.2.8";
        const fileName = APKS[v as keyof typeof APKS];
        ensurefileName(fileName);        
        return path.resolve("files", fileName);
    }
};