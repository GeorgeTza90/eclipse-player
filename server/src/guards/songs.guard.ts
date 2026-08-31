import { Song } from "@/types/songs.types.js";
import { Ensure } from "@/utils/ensure.js";

export function ensureSongExists(song: Song[]) {
    Ensure.that(song.length > 0, "SONG_NOT_FOUND", 404);
}