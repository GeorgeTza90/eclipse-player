import { Response } from "express";
import { AuthenticatedRequest } from "@/types/auth.types.js";
import { playsService } from "@/services/plays.service.js";
import { asyncHandler } from "@/utils/asyncHandler.js";
import { logger } from "@/utils/logger.js";

export const recordPlay = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user.id;
    const { songId, durationListenedSeconds, songDurationSeconds } = req.body;

    const play = await playsService.recordPlay(userId, songId, durationListenedSeconds, songDurationSeconds);
    res.status(201).json(play);
});

export const getMyStats = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user.id;
    const { range } = req.query as { range: "7d" | "1m" | "3m" | "all" };

    const stats = await playsService.getFullStats(userId, range);
    res.json(stats);
});

export const getSongStats = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {    
    const { songId } = req.query as {songId: string};
    const { range } = req.query as { range: "7d" | "1m" | "3m" | "all" };    
    
    const stats = await playsService.getSongStats(Number(songId), range);
    res.json(stats);
});