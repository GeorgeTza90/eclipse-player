import { AppError } from "../errors/AppError.js";
import { ResultSetHeader } from "mysql2";
import { Playlist, PlaylistSong } from "../types/playlists.types.js";

export function ensurePlaylistExists(playlist: Playlist[]) {
    if (playlist.length === 0) throw new AppError("PLAYLIST_NOT_FOUND", 404);
}

export function ensureSongExists(song: PlaylistSong[]) {
    if (song.length === 0) throw new AppError("SONG_NOT_FOUND_IN_PLAYLIST", 404);
}

export function ensureSongIndexExists(index: number) {
    if (index === -1) throw new AppError("SONG_NOT_FOUND_IN_PLAYLIST", 404);
}

export function ensureValidOrder(order: number, max: number) {
    if (order < 0 || order > max) throw new AppError("INVALID_ORDER", 400);
}

export function ensureSongNotExists(song: PlaylistSong[]) {
    if (song.length > 0) throw new AppError("SONG_ALREADY_IN_PLAYLIST", 400);
}

export function ensurePlaylistUpdated(result: ResultSetHeader) {
    if (result.affectedRows === 0) throw new AppError("PLAYLIST_NOT_FOUND", 404);
}