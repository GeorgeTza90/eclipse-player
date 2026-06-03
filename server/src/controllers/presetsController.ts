import { Response } from "express";
import { AuthenticatedRequest } from "../types/controllersTypes.js";
import { presetsService } from "../services/presetsService.js";
import { guard } from "../utils/guards.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// -----------------------------
// GET PRESETS
// -----------------------------
export const getPresets = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user.id;    
    const rows = await presetsService.getPresets(userId);
    res.json(rows);
});

// -----------------------------
// CREATE PRESETS
// -----------------------------
export const createPresets = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {        
    const userId = req.user.id; 
    const { title, preset } = req.body;
    await presetsService.createPresets(userId, title, preset ? JSON.stringify(preset) : undefined);
    res.status(201).json({ message: "Preset created successfully" });
});

// -----------------------------
// UPDATE PRESETS
// -----------------------------
export const updatePresets = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {    
    const userId = req.user.id;
    const { id } = req.params;
    const { title, preset } = req.body;    
    await presetsService.updatePresets( Number(id), userId, title, preset ? JSON.stringify(preset) : undefined );        
    res.json({ message: "Preset updated successfully" });
});

// -----------------------------
// DELETE PRESETS
// -----------------------------
export const deletePresets = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {    
    const userId = req.user.id;
    const presetId = Number(req.params.id);
    await presetsService.deletePresets(presetId, userId);    
    res.json({ message: "Preset deleted successfully" });
    
});