import { API_URL } from "../config";

// Auth
export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include"
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
    credentials: "include"
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Register Failed");
  return data;
}

export async function googleLogin(accessToken, platform) {  
  const res = await fetch(`${API_URL}/api/auth/google-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accessToken, platform }),
    credentials: "include"
  });
  if (!res.ok) throw new Error("Google login failed");
  return res.json();
}

export async function forgotPassword(email) {
  const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    credentials: "include"
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to send reset email");
  return data;
}

export async function resetPassword(token, newPassword) {
  const res = await fetch(`${API_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
    credentials: "include"
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Reset password failed");
  return data;
}

// Playlists
export async function createPlaylist(title, description) {
  const res = await fetch(`${API_URL}/api/playlists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
    credentials: "include"
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create playlist");
  return data;
}

export async function updatePlaylist(id, title, description) {
  const res = await fetch(`${API_URL}/api/playlists/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
    credentials: "include"
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update playlist");
  return data;
}

export async function addSongToPlaylist(playlistId, songId) {
  const res = await fetch(`${API_URL}/api/playlists/${playlistId}/songs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ songId }),
    credentials: "include"
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to add song");
  return data;
}

export async function moveSongInPlaylist(playlistId, songId, newOrder) {
  const res = await fetch(`${API_URL}/api/playlists/${playlistId}/songs/${songId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newOrder }),
    credentials: "include"
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to move song");
  return data;
}

// Presets
export async function createPreset(title, preset) {
  const res = await fetch(`${API_URL}/api/presets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, preset }),
    credentials: "include"
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create preset");
  return data;
}

export async function updatePreset(id, title, presetJsonString) {
  const res = await fetch(`${API_URL}/api/presets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, preset: presetJsonString }),
    credentials: "include"
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update preset");
  return data;
}
