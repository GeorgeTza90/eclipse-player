import { playsRepository } from "@/repositories/plays.repository.js";
import { ensurePlayCreated } from "@/guards/plays.guard.js";
import { ensureUserAuthorized } from "@/guards/auth.guard.js";
import { ensureSongExists } from "@/guards/songs.guard.js";
import { resolveSinceDate } from "@/utils/helpers.js";
import { PLAY_THRESHOLD_PERCENTAGE, PLAY_THRESHOLD_SECONDS, RANGE_CONFIG } from "@/utils/generalConfigs.js";

export const playsService = {
    async recordPlay(userId: number, songId: number, durationListenedSeconds: number, songDurationSeconds: number) {
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

    async getSongStats(songId: number, range: string, userId: number) {             
        const user = await playsRepository.findUserPrivateFlag(userId);
        ensureUserAuthorized(user);
        
        const config = RANGE_CONFIG[range] ?? RANGE_CONFIG["1m"];
        const sinceDate = resolveSinceDate(config.days);
                
        const songHistory = await playsRepository.findSongHistory(songId, sinceDate, config.groupFormat);
        return songHistory;        
    },

    async getSongPlayCount(songId: number) {
        return playsRepository.countPlaysFotSong(songId);
    },
};