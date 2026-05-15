import { Request, Response } from "express";
import { artistsService } from "../services/artistsService.js";

// -----------------------------
// Artists GET ALL
// -----------------------------
export const getAllArtists = async (req: Request, res: Response) => {
    try {
        const artists = await artistsService.getAllArtists();        
        res.json(artists);
    } catch (error) {        
        res.status(500).json({ error: "Server Error" });
    }
};

// -----------------------------
// Artist GET 
// -----------------------------
export const getArtist = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.params;
    if (!name || Array.isArray(name)) { res.status(400).json({ error: "Artist name is required" }); return; }

    try {
        const artist = await artistsService.getArtist(name);        
        if (!artist) { res.status(404).json({ error: "Artist not found" }); return; }
        res.json(artist);
    } catch (error) {        
        res.status(500).json({ error: "Server error" });
    }
};
