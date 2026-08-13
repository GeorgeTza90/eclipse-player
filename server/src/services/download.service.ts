import path from "path";
import { ensurefileName } from "../guards/downloads.guard.js";

const APKS = {    
    "0.3.2": "eclipse_player_v0.3.2.apk",
} as const;

export const apkService = {
    getApkPath(version?: string): string {
        const v = version ?? "0.3.1";
        const fileName = APKS[v as keyof typeof APKS];
        ensurefileName(fileName);        
        return path.resolve("files", fileName);
    }
};