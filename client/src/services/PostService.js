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

export async function googleLogin(accessToken, platform) {  
  const res = await fetch(`${API_URL}/api/auth/google-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accessToken, platform })
  });

  if (!res.ok) throw new Error("Google login failed");
  return res.json();
};

export async function forgotPassword(email) {
  const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
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
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Reset password failed");
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
