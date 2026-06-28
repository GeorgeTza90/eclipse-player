import { Playlist } from "@/types/playlists";
import { apiFetch } from "@/utils/apiFetch";

// -------------------- Auth --------------------
export const updateUsername = async (newUsername: string) => {
    await apiFetch("/api/auth/update-username", {
        method: "PUT",
        body: JSON.stringify({ newUsername }),
    })
}

// -------------------- Playlists --------------------

export const updatePlaylist = (id: number, title: string, description: string) => 
    apiFetch<Playlist>(`/api/playlists/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
    });

export const moveSongInPlaylist = (playlistId: number, songId: number, newOrder: number) =>
    apiFetch<any>(`/api/playlists/${playlistId}/songs/${songId}`, {
        method: "PUT",
        body: JSON.stringify({ newOrder }),
    });