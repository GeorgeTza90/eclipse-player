import { API_URL } from "../config";

// Auth
export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login Failed");
  return data;
}

export async function registerUser(username, email, password) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Register Failed");
  return data;
}

export async function googleLogin(idToken, platform = "web") {
    const res = await fetch(`${API_URL}/api/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, platform }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Google login failed");
    return data;
}


// Playlists
export async function createPlaylist(token, title, description) {
  const res = await fetch(`${API_URL}/api/playlists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create playlist");
  return data;
}

export async function updatePlaylist(id, title, description, token) {
  const res = await fetch(`${API_URL}/api/playlists/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update playlist");
  return data;
}

export async function addSongToPlaylist(playlistId, songId, token) {
  const res = await fetch(`${API_URL}/api/playlists/${playlistId}/songs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ songId }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to add song");
  return data;
}

export async function moveSongInPlaylist(playlistId, songId, newOrder, token) {
  const res = await fetch(`${API_URL}/api/playlists/${playlistId}/songs/${songId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ newOrder }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to move song");
  return data;
}
