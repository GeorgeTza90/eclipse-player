import { playsRepository } from "@/repositories/plays.repository.js";
import { ensurePlayCreated } from "@/guards/plays.guard.js";

const PLAY_THRESHOLD_SECONDS = 30;
const PLAY_THRESHOLD_PERCENTAGE = 0.5;

export const playsService = {
    async recordPlay(
        userId: number,
        songId: number,
        durationListenedSeconds: number,
        songDurationSeconds: number
    ) {
        const threshold = Math.min(
            PLAY_THRESHOLD_SECONDS,
            songDurationSeconds * PLAY_THRESHOLD_PERCENTAGE
        );
        const completed = durationListenedSeconds >= threshold;

        const insertId = await playsRepository.createPlay(
            userId, songId, durationListenedSeconds, songDurationSeconds, completed
        );

        const [play] = await playsRepository.findById(insertId);
        ensurePlayCreated(play);

        return play;
    },

    async getUserStats(userId: number, sinceDate: Date, limit = 10) {
        return playsRepository.findTopSongsForUser(userId, sinceDate, limit);
    },
};