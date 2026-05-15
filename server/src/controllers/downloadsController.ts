import { Request, Response } from "express";
import { apkService } from "../services/downloadService.js";

// -----------------------------
// Download APK
// -----------------------------
export const downloadAPK = async (req: Request, res: Response): Promise<void> => {
    try {
        const filePath = apkService.getApkPath();
        res.download(filePath);
    } catch (error) {        
        res.status(500).json({ error: "Server Error" });
    }
};