import { API_URL } from "@/config";
import { Song } from "@/types/songs";
import { Playlist } from "@/types/playlists";

console.log(API_URL);

function getFullUrl(path: string) {
    if (!path) return "";
    if (path.startsWith("http")) return path; // Cloudinary ή άλλο full URL
    return `${API_URL}/data${path}`;           // local server
}

// Songs
export async function fetchSongs(): Promise<Song[]> {
    const response = await fetch(`${API_URL}/api/songs`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data: Song[] = await response.json();
    return data.map(song => ({
        ...song,
        url: song.url,
        image: song.image,
    }));
}

export async function fetchSongById(songId: number): Promise<Song> {
    const res = await fetch(`${API_URL}/api/songs/${songId}`);
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.message || "Failed to fetch song");
    }
    const song: Song = await res.json();
    return song;
}

// Auth
export async function loginUser(email: string, password: string) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login Failed');
    return data;
}

export async function registerUser(username: string, email: string, password: string) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Register Failed');
    return data;
}

// Playlists
export async function fetchUserPlaylists(token: string): Promise<Playlist[]> {
    const res = await fetch(`${API_URL}/api/playlists`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch playlists');

    const playlists: Playlist[] = await res.json();

    const playlistsWithCounts = await Promise.all(
        playlists.map(async (pl) => {
            const songsRes = await fetch(`${API_URL}/api/playlists/${pl.id}/songs`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const songs = songsRes.ok ? await songsRes.json() : [];
            return { ...pl, songCount: songs.length };
        })
    );

    return playlistsWithCounts;
}

export async function createPlaylist(token: string, title: string, description?: string): Promise<Playlist> {
    const res = await fetch(`${API_URL}/api/playlists`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, description })
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Failed to create playlist");
    }

    return data;
}

export async function updatePlaylist(id: number, title: string, description: string, token: string) {
    const res = await fetch(`${API_URL}/api/playlists/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, description })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to update playlist");
    return data;
}

export async function deletePlaylist(id: number, token: string) {
    const res = await fetch(`${API_URL}/api/playlists/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to delete playlist");
    return data;
}

// Playlist Songs
export async function fetchPlaylistSongs(token: string, playlistId: number) {
    const res = await fetch(`${API_URL}/api/playlists/${playlistId}/songs`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to fetch playlist songs");
    return data.map((song: any) => ({
        ...song,
        url: song.url,
        image: song.image,
    }));
}

export async function addSongToPlaylist(playlistId: number, songId: number, token: string) {
    const res = await fetch(`${API_URL}/api/playlists/${playlistId}/songs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ songId })
    });
    const data = await res.json();
    if (!res.ok) {
        if (data.error === "Song already in playlist") {
            return { status: "duplicate", message: data.error };
        }
        throw new Error(data.error || "Failed to add song");
    }
    return data;
}

export async function moveSongInPlaylist(playlistId: number, songId: number, newOrder: number, token: string) {
    const res = await fetch(`${API_URL}/api/playlists/${playlistId}/songs/${songId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ newOrder })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to move song");
    return data;
}

export async function deleteSongFromPlaylist(playlistId: number, songId: number, token: string) {
    const res = await fetch(`${API_URL}/api/playlists/${playlistId}/songs/${songId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to delete song");
    return data;
}
