import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/controllersTypes.js";
import { songsService } from "../services/songsService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// -----------------------------
// GET SONGS
// -----------------------------
export const getSongs = asyncHandler(async (req: Request, res: Response): Promise<void> => {    
    const songs = await songsService.getSongs();
    res.json(songs);
});

// -----------------------------
// GET PRIVATE SONGS
// -----------------------------
export const getPrivateSongs = asyncHandler(async ( req: AuthenticatedRequest, res: Response ): Promise<void> => {    
        const userId = req.user.id;        
        const { songs } = await songsService.getPrivateSongs(userId);       
        res.json(songs);
});