import { Response } from "express";
import { AuthenticatedRequest } from "@/types/auth.types.js";
import { playsService } from "@/services/plays.service.js";
import { asyncHandler } from "@/utils/asyncHandler.js";

export const recordPlay = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user.id;
    const { songId, durationListenedSeconds, songDurationSeconds } = req.body;

    const play = await playsService.recordPlay(userId, songId, durationListenedSeconds, songDurationSeconds);
    res.status(201).json(play);
});

export const getMyStats = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user.id;
    const sinceDate = new Date();
    sinceDate.setMonth(sinceDate.getMonth() - 1);

    const stats = await playsService.getUserStats(userId, sinceDate);
    res.json(stats);
});