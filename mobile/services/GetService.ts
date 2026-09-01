import { apiFetch } from "@/utils/apiFetch";
import { Song, PlaylistSong } from "@/types/songs";
import { Playlist } from "@/types/playlists";
import { User } from "@/types/auth";
import { HistoryBucket, PlayStats, StatsRange } from "@/types/stats";

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

// -------------------- Plays --------------------
export const fetchPlayStats = (range: StatsRange = "1m") =>
    apiFetch<PlayStats>(`/api/plays/stats?range=${range}`);

export const fetchSongStats = (songId: number, range: StatsRange = "1m") =>
    apiFetch<HistoryBucket[]>(`/api/plays/stats/song?songId=${songId}&range=${range}`);

export const fetchSongTotalPlays = (songId: number) =>
    apiFetch<any>(`/api/plays/stats/song/plays?songId=${songId}`);