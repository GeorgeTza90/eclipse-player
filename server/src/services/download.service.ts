import path from "path";
import { ensureFileName } from "@/guards/downloads.guard.js";

const APKS = {    
    "0.3.2": "eclipse_player_v0.3.2.apk",
} as const;

const DesktopAPPs = {    
    "0.1.2": "eclipse-player-desktop_x64_0.1.2.msi",
} as const;

export const downloadService = {
    getApkPath(version?: string): string {
        const v = version ?? "0.3.2";
        const fileName = APKS[v as keyof typeof APKS];
        ensureFileName(fileName);        
        return path.resolve("files", fileName);
    },

    getDesktopPath(version?: string): string {
        const v = version ?? "0.1.2";
        const fileName = DesktopAPPs[v as keyof typeof DesktopAPPs];
        ensureFileName(fileName);        
        return path.resolve("files", fileName);
    }
};