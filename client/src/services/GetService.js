import { API_URL } from "../config";
console.log(API_URL);

// Songs
export async function fetchSongs() {
  const res = await fetch(`${API_URL}/api/songs`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json(); // Cloudinary URLs ήδη σωστά στη βάση
}

export async function fetchSongById(songId) {
  const res = await fetch(`${API_URL}/api/songs/${songId}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || "Failed to fetch song");
  }
  return res.json();
}

// Playlists
export async function fetchUserPlaylists(token) {
  const res = await fetch(`${API_URL}/api/playlists`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch playlists");

  const playlists = await res.json();

  const playlistsWithCounts = await Promise.all(
    playlists.map(async (pl) => {
      const songsRes = await fetch(`${API_URL}/api/playlists/${pl.id}/songs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const songs = songsRes.ok ? await songsRes.json() : [];
      return { ...pl, songCount: songs.length };
    })
  );

  return playlistsWithCounts;
}

export async function fetchPlaylistSongs(token, playlistId) {
  const res = await fetch(`${API_URL}/api/playlists/${playlistId}/songs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to fetch playlist songs");
  }
  return res.json(); 
}
