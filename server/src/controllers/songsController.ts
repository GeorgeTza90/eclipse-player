import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/controllersTypes.js";
import { songsService } from "../services/songsService.js";

// -----------------------------
// GET SONGS
// -----------------------------
export const getSongs = async (req: Request, res: Response): Promise<void> => {
    try {
        const songs = await songsService.getSongs();
        res.json(songs);
    } catch (error) {        
        res.status(500).json({ error: "Server error" });
    }
};

// -----------------------------
// GET PRIVATE SONGS
// -----------------------------
export const getPrivateSongs = async ( req: AuthenticatedRequest, res: Response ): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

        const result = await songsService.getPrivateSongs(userId);
        if (!result.user) { res.status(403).json({ error: "Forbidden" }); return; }

        res.json(result.songs);
    } catch (error) {        
        res.status(500).json({ error: "Server error" });
    }
};