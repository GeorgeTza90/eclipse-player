import { API_URL } from "../config";

// -------------------- Playlists --------------------
export async function deletePlaylist(id) {
    const res = await fetch(`${API_URL}/api/playlists/${id}`, {
        method: "DELETE",
        credentials: "include"
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error || "Failed to delete playlist");
    }    
    return res.json();
}

export async function deleteSongFromPlaylist(playlistId, songId) {
    const res = await fetch(`${API_URL}/api/playlists/${playlistId}/songs/${songId}`, {
        method: "DELETE",
        credentials: "include"
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error || "Failed to delete song");
    }    
    return res.json();
}

// -------------------- Presets --------------------
export async function deleteUserPreset(id) {    
    const res = await fetch(`${API_URL}/api/presets/${id}`, {
        method: "DELETE",
        credentials: "include"
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error || "Failed to delete preset");
    }    
    return res.json();
}