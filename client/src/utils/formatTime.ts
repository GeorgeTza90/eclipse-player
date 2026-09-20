import type { Song } from "@/types/songs.types";
import { logger } from "./logger";

export function formatTime(millis: number): string {
    if (!millis || millis < 0) return "0:00";
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function useAlbumDuration(songs: Song[]): string {
    const totalSeconds = Math.floor(
        songs.reduce((acc, song) => {
            const duration = song.duration || 0;
            if (duration < 0) logger.error(`Negative song duration detected: ${duration}`);
            return acc + Math.abs(duration);
        }, 0)
    );
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const durationString = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m ${seconds}s`;
    return durationString;
}

export const formatDuration = (seconds: number): string => {
    if (!seconds || seconds < 0) return "0h 0m";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
};

export const formatMonth = (monthStr: string): string => {
    const [year, month] = monthStr.split("-");
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};