import { Request, Response } from "express";
import { User, Song, AuthenticatedRequest } from "../types/controllersTypes";
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
    const userId = req.user?.id;
    if(!userId) { res.status(401).json({ error: "Unauthorized"}); return;}
    
    const [rows] = await db.query<User[]>('SELECT private FROM users WHERE id = ?', [userId])
    const user = rows[0];
    if (!user) { res.status(404).json({ error: "User not found" }); return; }    
    if (!user.private) { res.status(403).json({ error: "Forbidden" }); return; }    

    const [songs] = await db.query<Song[]>("SELECT * FROM private_songs");
    res.json(songs);    
  } catch (error) {
    console.error("Error loading songs:", error);
    res.status(500).json({ error: "Server error" });
  }
};