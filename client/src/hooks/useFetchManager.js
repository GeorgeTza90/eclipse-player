import { useCallback, useState } from "react";
import { fetchArtist, fetchPlaylistSongs, fetchSongs, fetchSongById, fetchUserPlaylists, fetchPrivateSongs, fetchArtists, fetchCurrentUser, logoutUser, fetchUserPresets } from "../services/GetService";

const apiHooks = {
    songs: fetchSongs,
    songsById: fetchSongById,
    privateSongs: fetchPrivateSongs,
    artists: fetchArtists,
    artist: fetchArtist,
    playlists: fetchUserPlaylists,
    playlistSongs: fetchPlaylistSongs,
    user: fetchCurrentUser,
    logout: logoutUser,
    userPresets: fetchUserPresets,
}

export function useFetchManager() {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState({});
    const [error, setError] = useState({});

    const call = useCallback(async (key, ...args) => {
        setLoading(prev => ({ ...prev, [key]: true }));
        setError(prev => ({ ...prev, [key]: null }));
        try {
          const data = await apiHooks[key](...args);
          setState(prev => ({ ...prev, [key]: data }));
        } catch (err) {
          setError(prev => ({ ...prev, [key]: err }));
        } finally {
          setLoading(prev => ({ ...prev, [key]: false }));
        }
    }, []);

    return { state, loading, error, call };
}