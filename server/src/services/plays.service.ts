import { playsRepository } from "@/repositories/plays.repository.js";
import { ensureSongExists, ensurePlayCreated } from "@/guards/plays.guard.js";

const PLAY_THRESHOLD_SECONDS = 30;
const PLAY_THRESHOLD_PERCENTAGE = 0.5;
const RANGE_CONFIG: Record<string, { days: number | null; groupFormat: string }> = {
    "7d":  { days: 7,   groupFormat: "%Y-%m-%d" },
    "1m":  { days: 30,  groupFormat: "%Y-%m-%d" },
    "3m":  { days: 90,  groupFormat: "%x-%v" },   // ISO year-week
    "all": { days: null, groupFormat: "%Y-%m" },
};

function resolveSinceDate(days: number | null): Date | null {
    if (days === null) return null;
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d;
}

export const playsService = {
    async recordPlay(
        userId: number,
        songId: number,
        durationListenedSeconds: number,
        songDurationSeconds: number
    ) {
        const song = await playsRepository.findSongById(songId);
        ensureSongExists(song);

        const threshold = Math.min(
            PLAY_THRESHOLD_SECONDS,
            songDurationSeconds * PLAY_THRESHOLD_PERCENTAGE
        );
        const completed = durationListenedSeconds >= threshold;

        const insertId = await playsRepository.createPlay(
            userId, songId, durationListenedSeconds, songDurationSeconds, completed
        );

        const play = await playsRepository.findById(insertId);
        ensurePlayCreated(play);

        return play[0];
    },

    async getFullStats(userId: number, range: string) {
        const config = RANGE_CONFIG[range] ?? RANGE_CONFIG["1m"];
        const sinceDate = resolveSinceDate(config.days);

        const [topSongs, totalSeconds, history] = await Promise.all([
            playsRepository.findTopSongsForUser(userId, sinceDate ?? new Date(0), 10),
            playsRepository.findTotalListeningTime(userId, sinceDate ?? new Date(0)),
            playsRepository.findHistory(userId, sinceDate, config.groupFormat),
        ]);

        return { topSongs, totalSeconds, history };
    },

    async getUserStats(userId: number, sinceDate: Date, limit = 10) {
        return playsRepository.findTopSongsForUser(userId, sinceDate, limit);
    },
};