import AsyncStorage from "@react-native-async-storage/async-storage";
import { Playlist } from "@/types/playlists";
import { User } from "@/types/auth";
import { apiFetch } from "@/utils/apiFetch";

// -------------------- Auth --------------------
export const loginUser = async (email: string, password: string) => {   
    const { user, token } = await apiFetch<{ user: User; token: string }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
    await AsyncStorage.setItem("token", token);
    return user;
};

export const registerUser = async (username: string, email: string, password: string) => {
    const { user, token } = await apiFetch<{ user: User; token: string }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
    });
    await AsyncStorage.setItem("token", token);
    return user;
};

export const googleLogin = async (accessToken: string, platform: "mobile") => {
    const { user, token } = await apiFetch<{ user: User; token: string }>("/api/auth/google-login", {
        method: "POST",
        body: JSON.stringify({ accessToken, platform }),
    });
    await AsyncStorage.setItem("token", token);
    return user;
};

export const logoutUser = async () => {
    await apiFetch("/api/auth/logout", { method: "POST" });
    await AsyncStorage.removeItem("token");
};

export const forgotPassword = (email: string) =>
    apiFetch<any>("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
    });

export const resetPassword = async (token: string, newPassword: string) => {
    const { user, token: newToken } = await apiFetch<{ user: User; token: string }>("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, newPassword }),
    });
    await AsyncStorage.setItem("token", newToken);
    return user;
};

// -------------------- Playlists --------------------
export const createPlaylist = (title: string, description?: string) => 
    apiFetch<Playlist>("/api/playlists", {
        method: "POST",
        body: JSON.stringify({ title, description }),
    });

export const addSongToPlaylist = (playlistId: number, songId: number) => 
    apiFetch<any>(`/api/playlists/${playlistId}/songs`, {
        method: "POST",
        body: JSON.stringify({ songId }),
    });