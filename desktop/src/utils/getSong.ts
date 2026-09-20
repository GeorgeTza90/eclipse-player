import { Song } from "@/types/songs.types";

export function getSongTitle(songId: number, songs: Song[]): string {
    if (!songId) return "Missing Song ID";
    if (songs.length <= 0) return "Missing Songs Library";
    const song = songs.find((s) => Number(s.id) === songId);
    return song ? song.title : `Song #${songId}`;
};

export function getSongData(songId: number, songs: Song[]): Song | null {    
    if (!songId || songs.length <= 0) return null;
    const song = songs.find((s) => Number(s.id) === songId);
    return song ?? null;
}
