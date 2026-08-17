import { API_URL } from "@/config";
import { errorChecker } from "@/utils/errorChecker";

// -------------------- Auth --------------------
export async function loginUser(email: string, password: string) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
    });
    await errorChecker(res, "Login Failed");
    return res.json();
}

export async function registerUser(username: string, email: string, password: string) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
        credentials: "include"
    });
    await errorChecker(res, "Register Failed");
    return res.json();
}

export async function googleLogin(accessToken: string, platform: "web" | "mobile") {
    const res = await fetch(`${API_URL}/api/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken, platform }),
        credentials: "include"
    });
    await errorChecker(res, "Google login failed");
    return res.json();
}

export async function logoutUser() {
    const res = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
    });
    await errorChecker(res, "Logout failed");
    return res.json();
}

export async function forgotPassword(email: string) {
    const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include"
    });
    await errorChecker(res, "Failed to send reset email");
    return res.json();
}

export async function resetPassword(token: string, newPassword: string) {
    const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
        credentials: "include"
    });
    await errorChecker(res, "Reset password failed");
    return res.json();
}

// -------------------- Playlists --------------------
export async function createPlaylist(title: string, description: string) {
    const res = await fetch(`${API_URL}/api/playlists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
        credentials: "include"
    });
    await errorChecker(res, "Failed to create playlist");
    return res.json();
}

export async function addSongToPlaylist(id: number, songId: number) {
    const res = await fetch(`${API_URL}/api/playlists/${id}/songs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songId }),
        credentials: "include"
    });
    await errorChecker(res, "Failed to add song");
    return res.json();
}

// -------------------- Presets --------------------
export async function createPreset(title: string, preset: [string]) {
    const res = await fetch(`${API_URL}/api/presets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, preset }),
        credentials: "include"
    });
    await errorChecker(res, "Failed to create preset");
    return res.json();
}