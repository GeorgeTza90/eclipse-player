import { Song } from "@/types/songs";

export function formatTime(millis: number): string {
    if (!millis || millis < 0) return "0:00";
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function useAlbumDuration(songs: Song[]) {
    const totalSeconds = songs.reduce((acc, song) => acc + (song.duration || 0), 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const durationString = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m ${seconds}s`;
    return durationString;
}

