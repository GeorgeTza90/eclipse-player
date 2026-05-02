import { Request, Response } from "express";
import { Song, AuthenticatedRequest } from "../types/controllersTypes";
import db from "../db/db";

// -----------------------------
// GET SONGS
// -----------------------------
export const getSongs = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await db.query<Song[]>("SELECT * FROM songs");
    res.json(rows);
  } catch (error) {
    console.error("Error loading songs:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// -----------------------------
// GET PRIVATE SONGS
// -----------------------------
export const getPrivateSongs = async (req: AuthenticatedRequest, res: Response): Promise<void> => {  
  try {
    const user = req.user;
    if (!user?.private) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    const [rows] = await db.query<Song[]>("SELECT * FROM private_songs");
    res.json(rows);
  } catch (error) {
    console.error("Error loading songs:", error);
    res.status(500).json({ error: "Server error" });
  }
};