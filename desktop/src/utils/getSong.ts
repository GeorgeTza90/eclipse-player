import { Song } from "@/types/songs.types";

export function getSongTitle(songId: number, songs: Song[]): string {
    const song = songs.find((s) => Number(s.id) === songId);
    return song ? song.title : `Song #${songId}`;
};

export function getSongData(songId: number, songs: Song[]): Song | null {
    const song = songs.find((s) => Number(s.id) === songId);
    return song ?? null;
}