import { API_URL } from "../config";

// -------------------- Songs --------------------
export async function fetchSongs() {
  const res = await fetch(`${API_URL}/api/songs`, { credentials: "include" });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json(); // Cloudinary URLs are already correct in the database
}

export async function fetchSongById(songId) {
  const res = await fetch(`${API_URL}/api/songs/${songId}`, { credentials: "include" });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to fetch song");
  }
  return res.json();
}

// -------------------- Artists --------------------
export async function fetchArtists() {
  const res = await fetch(`${API_URL}/api/artists`, { credentials: "include" });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to fetch artists");
  }
  return res.json();
}

export async function fetchArtist(artistName) {
  if (!artistName) throw new Error("Artist name is required");

  const res = await fetch(`${API_URL}/api/artists/${encodeURIComponent(artistName)}`, { credentials: "include" });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to fetch artist");
  }
  return res.json();
}

// -------------------- Playlists --------------------
export async function fetchUserPlaylists() {
  const res = await fetch(`${API_URL}/api/playlists`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch playlists");

  const playlists = await res.json();

  const playlistsWithCounts = await Promise.all(
    playlists.map(async (pl) => {
      const songsRes = await fetch(`${API_URL}/api/playlists/${pl.id}/songs`, { credentials: "include" });
      const songs = songsRes.ok ? await songsRes.json() : [];
      return { ...pl, songCount: songs.length };
    })
  );

  return playlistsWithCounts;
}

export async function fetchPlaylistSongs(playlistId) {
  if (!playlistId) throw new Error("Playlist ID is required");

  const res = await fetch(`${API_URL}/api/playlists/${playlistId}/songs`, { credentials: "include" });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to fetch playlist songs");
  }
  return res.json();
}

// -------------------- Auth --------------------
export async function fetchCurrentUser() {
  const res = await fetch(`${API_URL}/api/auth/me`, { credentials: "include" });
  if (!res.ok) {
    if (res.status === 401) return null;
    throw new Error(`Failed to fetch user: ${res.status}`);
  }
  return res.json();
}

export async function logoutUser() {
  const res = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "Logout failed");
    throw new Error(errText || "Logout failed");
  }
  
  try {
    return await res.json();
  } catch {
    return null;
  }
}

// -------------------- Presets --------------------
export async function fetchUserPresets() {
  const res = await fetch(`${API_URL}/api/presets`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch presets");  

  const presets = await res.json();
  
  return presets;
}