import { API_URL } from "../config";

// -------------------- Auth --------------------
export async function loginUser(email, password) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error || "Login Failed")
    }    
    return res.json();
}

export async function registerUser(username, email, password) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
        credentials: "include"
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error || "Register Failed")
    }    
    return res.json();
}

export async function googleLogin(accessToken, platform) {  
    const res = await fetch(`${API_URL}/api/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken, platform }),
        credentials: "include"
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error || "Google login failed")
    }     
    return res.json();
}

export async function forgotPassword(email) {
    const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include"
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error || "Failed to send reset email")
    }    
    return res.json();
}

export async function resetPassword(token, newPassword) {
    const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
        credentials: "include"
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error || "Reset password failed")
    }    
    return res.json();
}

// -------------------- Playlists --------------------
export async function createPlaylist(title, description) {
    const res = await fetch(`${API_URL}/api/playlists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
        credentials: "include"
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error || "Failed to create playlist")
    }    
    return res.json();
}

export async function addSongToPlaylist(id, songId) {    
    const res = await fetch(`${API_URL}/api/playlists/${id}/songs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songId }),
        credentials: "include"
    });    
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error || "Failed to add song")
    }
    return res.json();
}

// -------------------- Presets --------------------
export async function createPreset(title, preset) {    
    const res = await fetch(`${API_URL}/api/presets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, preset }),
        credentials: "include"
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error || "Failed to create preset")
    }    
    return res.json();
}