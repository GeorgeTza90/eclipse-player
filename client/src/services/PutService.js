import { API_URL } from "../config";
import { errorChecker } from "../utils/errorChecker";

// -------------------- Auth --------------------
export async function updateUsername(newUsername) {
    const res = await fetch(`${API_URL}/api/auth/update-username`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newUsername }),
        credentials: "include"
    });
    await errorChecker(res, "Username update failed");
    return res.json();
}

// -------------------- Playlists --------------------
export async function updatePlaylist(id, title, description) {
    const res = await fetch(`${API_URL}/api/playlists/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
        credentials: "include"
    });
    await errorChecker(res, "Failed to update playlist");
    return res.json();
}

export async function moveSongInPlaylist(id, songId, newOrder) {
    const res = await fetch(`${API_URL}/api/playlists/${id}/songs/${songId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newOrder }),
        credentials: "include"
    });
    await errorChecker(res, "Failed to move song");
    return res.json();
}

// -------------------- Presets --------------------
export async function updatePreset(id, title, preset) {
    const res = await fetch(`${API_URL}/api/presets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, preset }),
        credentials: "include"
    });
    await errorChecker(res, "Failed to update preset");
    return res.json();
}