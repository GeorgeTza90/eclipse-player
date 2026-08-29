import { Song } from "@/types/songs.types.js";
import { Play } from "@/types/plays.types.js";
import { Ensure } from "@/utils/ensure.js";

export function ensureSongExists(song: Song[]) {
    Ensure.that(song.length > 0, "SONG_NOT_FOUND", 404);
}

export function ensurePlayCreated(play: Play[]) {
    Ensure.that(play.length > 0, "PLAY_NOT_FOUND", 500);
}