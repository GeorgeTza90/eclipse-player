import { Request, Response } from "express";
import path from "path";

const APKfilePath = path.resolve("files/eclipse_player_v1.2.4.apk");

// -----------------------------
// Download APK
// -----------------------------
export const downloadAPK = async (req: Request, res: Response): Promise<void> => {
  try {
    res.download(APKfilePath);
  } catch (error) {
    console.error("Error downloading APK:", error);
    res.status(500).json({ error: "Server Error" });
  }
};