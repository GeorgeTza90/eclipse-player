import { ResultSetHeader } from "mysql2";
import { Playlist, PlaylistSong } from "@/types/playlists.types.js";
import { Ensure } from "@/utils/ensure.js";

export function ensurePlaylistExists(playlist: Playlist[]) {
    Ensure.that(playlist.length > 0, "PLAYLIST_NOT_FOUND", 404);
}

export function ensureSongExistsInPlaylist(song: PlaylistSong[]) {
    Ensure.that(song.length > 0, "SONG_NOT_FOUND_IN_PLAYLIST", 404);
}

export function ensureSongIndexExistsInPlaylist(index: number) {
    Ensure.that(index !== -1, "SONG_NOT_FOUND_IN_PLAYLIST", 404);
}

export function ensureValidPlaylistOrder(order: number, max: number) {
    Ensure.that(order >= 0 && order <= max, "INVALID_ORDER", 400);
}

export function ensureSongNotExistsInPlaylist(song: PlaylistSong[]) {
    Ensure.that(song.length === 0, "SONG_ALREADY_IN_PLAYLIST", 400);
}

export function ensurePlaylistUpdated(result: ResultSetHeader) {
    Ensure.that(result.affectedRows > 0, "PLAYLIST_NOT_FOUND", 404);
}