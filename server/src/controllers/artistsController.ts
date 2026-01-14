import { Request, Response } from "express";
import db from "../db/db";
import { Artist } from "../types/controllersTypes";

// -----------------------------
// Artists GET ALL
// -----------------------------
export const getAllArtists = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await db.query<Artist[]>("SELECT * FROM artists");
    res.json(rows);
  } catch (error) {
    console.error("Error loading artists:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// -----------------------------
// Artist GET 
// -----------------------------
export const getArtist = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.params;

  if (!name) {
    res.status(400).json({ error: "Artist name is required" });
    return;
  }

  try {
    const [rows] = await db.query<Artist[]>(
      "SELECT * FROM artists WHERE name = ?",
      [name]
    );

    if (rows.length === 0) {
      res.status(404).json({ error: "Artist not found" });
      return;
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching artist:", error);
    res.status(500).json({ error: "Server error" });
  }
};
