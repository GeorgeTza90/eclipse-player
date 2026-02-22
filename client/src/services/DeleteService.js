import { API_URL } from "../config";

export async function deletePlaylist(id) {
  const res = await fetch(`${API_URL}/api/playlists/${id}`, {
    method: "DELETE",
    credentials: "include"
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to delete playlist");
  return data;
}

export async function deleteSongFromPlaylist(playlistId, songId) {
  const res = await fetch(`${API_URL}/api/playlists/${playlistId}/songs/${songId}`, {
    method: "DELETE",
    credentials: "include"
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to delete song");
  return data;
}
