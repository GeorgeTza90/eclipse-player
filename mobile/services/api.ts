import Constants from "expo-constants";
import { Song, PlaylistSong } from "@/types/songs";
import { Playlist } from "@/types/playlists";

const API_URL = Constants.expoConfig?.extra?.API_URL;

// -------------------- API WRAPPER --------------------
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include", // <-- το κλειδί για cookies / session
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  let data;
  try { data = await res.json(); } catch { data = null; }

  if (!res.ok) {
    throw new Error(data?.error || data?.message || "Request failed");
  }
  return data;
}

// -------------------- Songs --------------------
export const fetchSongs = () => apiFetch<Song[]>("/api/songs");

export const fetchSongById = (songId: number) => apiFetch<Song>(`/api/songs/${songId}`);

// -------------------- Artists --------------------
export const fetchArtists = () => apiFetch<any[]>("/api/artists");

export const fetchArtist = (artistName: string) => {
  if (!artistName) throw new Error("Artist name is required");
  return apiFetch<any>(`/api/artists/${encodeURIComponent(artistName)}`);
};

// -------------------- Auth --------------------
export const loginUser = (email: string, password: string) =>
  apiFetch<any>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const registerUser = (username: string, email: string, password: string) =>
  apiFetch<any>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });

export const googleLogin = (accessToken: string, platform: "web" | "mobile") =>
  apiFetch<any>("/api/auth/google-login", {
    method: "POST",
    body: JSON.stringify({ accessToken, platform }),
  });

export const fetchCurrentUser = () => apiFetch<any>("/api/auth/me");

export const logoutUser = async () => {
  const res = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "Logout failed");
    throw new Error(errText || "Logout failed");
  }

  try { return await res.json(); } catch { return null; }
};

export const forgotPassword = (email: string) =>
  apiFetch<any>("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

export const resetPassword = (token: string, newPassword: string) =>
  apiFetch<any>("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, newPassword }),
  });

// -------------------- Playlists --------------------
export const fetchUserPlaylists = async (): Promise<Playlist[]> => {
  const playlists = await apiFetch<Playlist[]>("/api/playlists");

  const playlistsWithCounts = await Promise.all(
    playlists.map(async (pl) => {
      const songs = await apiFetch<Song[]>(`/api/playlists/${pl.id}/songs`).catch(() => []);
      return { ...pl, songCount: songs.length };
    })
  );

  return playlistsWithCounts;
};

export const fetchPlaylistSongs = (playlistId: number): Promise<PlaylistSong[]> => {
  if (!playlistId) throw new Error("Playlist ID is required");
  return apiFetch<PlaylistSong[]>(`/api/playlists/${playlistId}/songs`);
};

export const createPlaylist = (title: string, description?: string) =>
  apiFetch<Playlist>("/api/playlists", {
    method: "POST",
    body: JSON.stringify({ title, description }),
  });

export const updatePlaylist = (id: number, title: string, description: string) =>
  apiFetch<any>(`/api/playlists/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, description }),
  });

export const deletePlaylist = (id: number) =>
  apiFetch<any>(`/api/playlists/${id}`, { method: "DELETE" });

export const addSongToPlaylist = (playlistId: number, songId: number) =>
  apiFetch<any>(`/api/playlists/${playlistId}/songs`, {
    method: "POST",
    body: JSON.stringify({ songId }),
  });

export const moveSongInPlaylist = (playlistId: number, songId: number, newOrder: number) =>
  apiFetch<any>(`/api/playlists/${playlistId}/songs/${songId}`, {
    method: "PUT",
    body: JSON.stringify({ newOrder }),
  });

export const deleteSongFromPlaylist = (playlistId: number, songId: number) =>
  apiFetch<any>(`/api/playlists/${playlistId}/songs/${songId}`, { method: "DELETE" });