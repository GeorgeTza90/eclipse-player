import { API_URL } from "../config";
import { errorChecker } from "../utils/errorChecker";

// -------------------- Auth --------------------
export async function fetchCurrentUser() {
    const res = await fetch(`${API_URL}/api/auth/me`, { credentials: "include" });
    if (!res.ok) {
        if (res.status === 401) return null;
        throw new Error(`Failed to fetch user: ${res.status}`);
    }
    return res.json();
}

// -------------------- Songs --------------------
export async function fetchSongs() {
    const res = await fetch(`${API_URL}/api/songs`, { credentials: "include" });
    await errorChecker(res, "Failed to fetch songs");
    return res.json();
}

export async function fetchSongById(songId) {
    const res = await fetch(`${API_URL}/api/songs/${songId}`, { credentials: "include" });
    await errorChecker(res, "Failed to fetch song");
    return res.json();
}

export async function fetchPrivateSongs() {
    const res = await fetch(`${API_URL}/api/songs/private`, { credentials: "include" });
    await errorChecker(res, "Failed to fetch private songs");
    return res.json();
}

// -------------------- Artists --------------------
export async function fetchArtists() {
    const res = await fetch(`${API_URL}/api/artists`, { credentials: "include" });
    await errorChecker(res, "Failed to fetch artists");
    return res.json();
}

export async function fetchArtist(artistName) {
    if (!artistName) throw new Error("Artist name is required");
    const res = await fetch(`${API_URL}/api/artists/${encodeURIComponent(artistName)}`, { credentials: "include" });
    await errorChecker(res, "Failed to fetch artist");
    return res.json();
}

// -------------------- Playlists --------------------
export async function fetchUserPlaylists() {
    const res = await fetch(`${API_URL}/api/playlists`, { credentials: "include" });
    await errorChecker(res, "Failed to fetch playlists");
    return res.json();
}

export async function fetchPlaylistSongs(id) {
    if (!id) throw new Error("Playlist ID is required");
    const res = await fetch(`${API_URL}/api/playlists/${id}/songs`, { credentials: "include" });
    await errorChecker(res, "Failed to fetch playlist songs");
    return res.json();
}



// -------------------- Presets --------------------
export async function fetchUserPresets() {
    const res = await fetch(`${API_URL}/api/presets`, { credentials: "include" });
    await errorChecker(res, "Failed to fetch presets");
    return res.json();
}