import { Request, Response } from "express";
import { Song } from "../types/controllersTypes";
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
export const getPrivateSongs = async (req: Request, res: Response): Promise<void> => {  
  try {
    const [rows] = await db.query<Song[]>("SELECT * FROM private_songs");
    res.json(rows);
  } catch (error) {
    console.error("Error loading songs:", error);
    res.status(500).json({ error: "Server error" });
  }
};