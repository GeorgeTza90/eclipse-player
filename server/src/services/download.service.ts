import path from "path";
import { ensureFileName } from "../guards/downloads.guard.js";

const APKS = {    
    "0.3.2": "eclipse_player_v0.3.2.apk",
} as const;

export const apkService = {
    getApkPath(version?: string): string {
        const v = version ?? "0.3.2";
        const fileName = APKS[v as keyof typeof APKS];
        ensureFileName(fileName);        
        return path.resolve("files", fileName);
    }
};