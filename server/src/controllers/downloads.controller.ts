import { Request, Response } from "express";
import { apkService } from "../services/download.service.js";
import { guard } from "../utils/guards.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// -----------------------------
// Download APK
// -----------------------------
export const downloadAPK = asyncHandler(async (req: Request, res: Response): Promise<void> => {    
    const version = req.query.version as string;
    const filePath = apkService.getApkPath(version);
    if (!guard(res, filePath, null, 400, "No file path found")) return;
    res.download(filePath);    
});