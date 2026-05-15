import { Response } from "express";
import { AuthenticatedRequest } from "../types/controllersTypes.js";
import { presetsService } from "../services/presetsService.js";

// -----------------------------
// GET PRESETS
// -----------------------------
export const getPresets = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

    try {
        const rows = await presetsService.getPresets(userId);
        res.json(rows);
    } catch (error) {        
        res.status(500).json({ error: "Server error" });
    }
};

// -----------------------------
// CREATE PRESETS
// -----------------------------
export const createPresets = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

    const { title, preset } = req.body as { title?: string; preset?: [string] };    
    if (!title || !title) { res.status(400).json({ error: "Preset and title is required" }); return; }

    try {
        await presetsService.createPresets(userId, title, preset ? JSON.stringify(preset) : undefined);
        res.status(201).json({ message: "Preset created successfully" });
    } catch (error) {        
        res.status(500).json({ error: "Server error" });
    }
};

// -----------------------------
// UPDATE PRESETS
// -----------------------------
export const updatePresets = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const { id } = req.params;
    const { title, preset } = req.body as { title?: string; preset?: [string] };
    if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

    try {
        const result = await presetsService.updatePresets( Number(id), userId, title, preset ? JSON.stringify(preset) : undefined );
        if (result.affectedRows === 0) { res.status(400).json({ error: "Preset not found or not authorized" }); return; }
        res.json({ message: "Preset updated successfully" });
    } catch (error) {        
        res.status(500).json({ error: "Server error" });
    }
};

// -----------------------------
// DELETE PRESETS
// -----------------------------
export const deletePresets = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const presetId = Number(req.params.id);
    if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

    try {
        const result = await presetsService.deletePresets(presetId, userId);
        if (result.affectedRows === 0) { res.status(400).json({ error: "Preset not found or not authorized" }); return; }
        res.json({ message: "Preset deleted successfully" });
    } catch (error) {        
        res.status(500).json({ error: "Server error" });
    }
};