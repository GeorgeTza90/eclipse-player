import { Request, Response } from "express";
import db from "../db/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { AuthenticatedRequest, Presets } from "../types/controllersTypes";

// -----------------------------
// Presets CRUD
// -----------------------------
export const getPresets = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }
    try {
        const [rows] = await db.query<Presets[]>("SELECT * FROM eq_presets WHERE user_id = ?",[userId]);
        res.json(rows)
    } catch (error) {
        console.error("Error Loading Presets:", error);
        res.status(500).json({ error: "Server error"});
    }
};

export const createPresets = async (req: AuthenticatedRequest, res: Response): Promise<void> => {

    const userId = req.user?.id;
    const { title, preset } = req.body as { title?: string, preset?: [string]};    
    if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }
    if (!title) { res.status(401).json({ error: "Preset title is required" }); return; }
    try {
        await db.query<ResultSetHeader>(
            "INSERT INTO eq_presets (user_id, title, preset) VALUES (?, ?, ?)", [userId, title, JSON.stringify(preset)]
        );
        res.status(201).json({ message: "Preset created successfully" });
    } catch (error) {
        console.error("Error creating preset:", error);
        res.status(500).json({ error: "Server error" });
    }
};

export const updatePresets = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const { id } = req.params;
    const { title, preset } = req.body as { title?: string, preset?: [string]};
    if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }
    if (!preset) { res.status(401).json({ error: "something went wrong" }); return; }
    try {
        const [result] = await db.query<ResultSetHeader>(
            "UPDATE eq_presets SET title = ? , preset = ? WHERE id = ? AND user_id = ?",
            [title, preset, id, userId]
        );

        if (result.affectedRows === 0 ) {
            res.status(400).json({ error: "Preset not found or not authorized" });
            return;
        }
        res.json({ message: "Preset updated successfully" });
    } catch (error) {
        console.error("Error updating preset:", error);
        res.status(500).json({ error: "Server error" });
    }
};

export const deletePresets = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const presetId = Number(req.params.id);
    if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }
    try {
        const [result] = await db.query<ResultSetHeader>(
            "DELETE FROM eq_presets WHERE id = ? AND user_id = ?", [presetId, userId]
        )

        if (result.affectedRows === 0 ) {
            res.status(400).json({ error: "Preset not found or not authorized" });
            return;
        }
        res.json({ message: "Preset deleted successfully" });
    } catch (error) {
        console.error("Error deleting preset:", error);
        res.status(500).json({ error: "Server error" });
    }
};