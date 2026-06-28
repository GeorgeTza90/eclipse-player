import { apiFetch } from "@/utils/apiFetch";

// -------------------- Playlists --------------------
export const deletePlaylist = (id: number) =>
    apiFetch<any>(`/api/playlists/${id}`, { method: "DELETE" });

export const deleteSongFromPlaylist = (playlistId: number, songId: number) =>
    apiFetch<any>(`/api/playlists/${playlistId}/songs/${songId}`, { method: "DELETE" });