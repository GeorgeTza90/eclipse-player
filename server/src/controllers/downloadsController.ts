import { Request, Response } from "express";
import { apkService } from "../services/downloadService.js";

// -----------------------------
// Download APK
// -----------------------------
export const downloadAPK = async (req: Request, res: Response): Promise<void> => {
    try {
        const version = req.query.version as string;
        const filePath = apkService.getApkPath(version);
        res.download(filePath);
    } catch (error) {        
        res.status(500).json({ error: "Server Error" });
    }
};