import { Song, PlaylistSong } from "@/types/songs";
import { Playlist } from "@/types/playlists";
import { User } from "@/types/auth";
import { apiFetch } from "@/utils/apiFetch";

// -------------------- Auth --------------------
export const fetchCurrentUser = () => apiFetch<User | null>("/api/auth/me");

// -------------------- Songs --------------------
export const fetchSongs = () => apiFetch<Song[]>("/api/songs");

export const fetchSongById = (songId: number) => apiFetch<Song>(`/api/songs/${songId}`);

export const fetchPrivateSongs = () => apiFetch<Song[]>("/api/songs/private");

// -------------------- Artists --------------------
export const fetchArtists = () => apiFetch<any[]>("/api/artists");

export const fetchArtist = (artistName: string) => {
    if (!artistName) throw new Error("Artist name is required");
    return apiFetch<any>(`/api/artists/${encodeURIComponent(artistName)}`);
};

// -------------------- Playlists --------------------
export const fetchUserPlaylists = () => apiFetch<Playlist[]>("/api/playlists");

export const fetchPlaylistSongs = (playlistId: number) => {
    if (!playlistId) throw new Error("Playlist ID is required");
    return apiFetch<PlaylistSong[]>(`/api/playlists/${playlistId}/songs`);
};