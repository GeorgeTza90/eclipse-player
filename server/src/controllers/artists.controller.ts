import { Request, Response } from "express";
import { artistsService } from "../services/artists.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// -----------------------------
// Artists GET ALL
// -----------------------------
export const getAllArtists = asyncHandler(async (req: Request, res: Response) => {    
    const artists = await artistsService.getAllArtists();
    res.json(artists);
});

// -----------------------------
// Artist GET 
// -----------------------------
export const getArtist = asyncHandler(async (req: Request, res: Response): Promise<void> => {    
    const name = req.params.name as string;    
    const artist = await artistsService.getArtist(name);    
    res.json(artist);
});