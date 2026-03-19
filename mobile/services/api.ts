import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Song, PlaylistSong } from "@/types/songs";
import { Playlist } from "@/types/playlists";
import { User } from "@/types/auth";

const API_URL = Constants.expoConfig?.extra?.API_URL;

// -------------------- Helper --------------------
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers && typeof options.headers === "object" && !Array.isArray(options.headers)
      ? Object.fromEntries(Object.entries(options.headers))
      : {}),
  };

  const token = await AsyncStorage.getItem("token");
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => res.statusText);
    throw new Error(errText || `HTTP ${res.status}`);
  }

  try {
    return await res.json();
  } catch {
    return {} as T;
  }
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
export const fetchCurrentUser = () => apiFetch<User | null>("/api/auth/me");

export const loginUser = async (email: string, password: string) => {
  if (!email || !password) throw new Error("Email and password are required");

  const { user, token } = await apiFetch<{ user: User; token: string }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  await AsyncStorage.setItem("token", token);
  return user;
};

export const registerUser = async (username: string, email: string, password: string) => {
  const { user, token } = await apiFetch<{ user: User; token: string }>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });

  await AsyncStorage.setItem("token", token);
  return user;
};

export const googleLogin = async (accessToken: string, platform: "web" | "mobile") => {
  const { user, token } = await apiFetch<{ user: User; token: string }>("/api/auth/google-login", {
    method: "POST",
    body: JSON.stringify({ accessToken, platform }),
  });

  await AsyncStorage.setItem("token", token);
  return user;
};

export const forgotPassword = (email: string) =>
  apiFetch<any>("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

export const resetPassword = async (token: string, newPassword: string) => {
  const { user, token: newToken } = await apiFetch<{ user: User; token: string }>("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, newPassword }),
  });

  await AsyncStorage.setItem("token", newToken);
  return user;
};

export const logoutUser = async () => {
  await apiFetch("/api/auth/logout", { method: "POST" });
  await AsyncStorage.removeItem("token");
};

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

export const fetchPlaylistSongs = (playlistId: number) => {
  if (!playlistId) throw new Error("Playlist ID is required");
  return apiFetch<PlaylistSong[]>(`/api/playlists/${playlistId}/songs`);
};

export const createPlaylist = (title: string, description?: string) =>
  apiFetch<Playlist>("/api/playlists", {
    method: "POST",
    body: JSON.stringify({ title, description }),
  });

export const updatePlaylist = (id: number, title: string, description: string) =>
  apiFetch<Playlist>(`/api/playlists/${id}`, {
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