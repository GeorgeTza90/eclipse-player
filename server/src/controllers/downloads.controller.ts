import { Request, Response } from "express";
import { downloadService } from "@/services/download.service.js";
import { asyncHandler } from "@/utils/asyncHandler.js";

// -----------------------------
// Download APK
// -----------------------------
export const downloadAPK = asyncHandler(async (req: Request, res: Response): Promise<void> => {    
    const version = req.query.version as string;
    const filePath = downloadService.getApkPath(version);    
    res.download(filePath);
});

// -----------------------------
// Download Desktop App
// -----------------------------
export const downloadDesktop = asyncHandler(async (req: Request, res: Response): Promise<void> => {    
    const version = req.query.version as string;
    console.log(version);
    const filePath = downloadService.getDesktopPath(version);    
    res.download(filePath);
});