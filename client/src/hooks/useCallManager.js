import { useCallback, useState } from "react";
import { fetchArtist, fetchPlaylistSongs, fetchSongs, fetchSongById, fetchUserPlaylists, fetchPrivateSongs, fetchArtists, fetchCurrentUser, logoutUser, fetchUserPresets } from "../services/GetService";
import { addSongToPlaylist, createPlaylist, createPreset, forgotPassword, loginUser, googleLogin, moveSongInPlaylist, registerUser, resetPassword, updatePlaylist, updatePreset } from "../services/PostService";
import { deletePlaylist, deleteSongFromPlaylist, deleteUserPreset } from "../services/DeleteService";

const fetchHooks = {
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

const postHooks = {
    registerUser, loginUser, googleLogin, forgotPassword, resetPassword, logoutUser,
    createPlaylist, updatePlaylist, addSongToPlaylist, moveSongInPlaylist,
    createPreset, updatePreset,
};

const deleteHooks = {
    deleteUserPreset, deletePlaylist, deleteSongFromPlaylist,
}

function useCallManager(hooksMap) {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState({});
    const [error, setError] = useState({});

    const call = useCallback(async (key, ...args) => {
        setLoading(prev => ({ ...prev, [key]: true }));
        setError(prev => ({ ...prev, [key]: null }));

        try {
            const data = await hooksMap[key](...args);
            setState(prev => ({ ...prev, [key]: data }));
            return data;
        } catch (err) {
            setError(prev => ({ ...prev, [key]: err }));
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, [key]: false }));
        }
    }, [hooksMap]);

    return { state, loading, error, call };
}

export const useFetchManager = () => useCallManager(fetchHooks);
export const usePostManager = () => useCallManager(postHooks);
export const useDeleteManager = () => useCallManager(deleteHooks);