import { useCallback, useState } from "react";
import { fetchArtist, fetchPlaylistSongs, fetchSongs, fetchSongById, fetchUserPlaylists, fetchPrivateSongs, fetchArtists, fetchCurrentUser, fetchUserPresets } from "@/services/GetService";
import { addSongToPlaylist, createPlaylist, createPreset, forgotPassword, loginUser, googleLogin, registerUser, logoutUser, resetPassword } from "@/services/PostService";
import { deletePlaylist, deleteSongFromPlaylist, deleteUserPreset } from "@/services/DeleteService";
import { updatePlaylist, updatePreset, updateUsername, moveSongInPlaylist } from "@/services/PutService";
import type { CallManagerError, CallManagerLoading, CallManagerState, HooksMap } from "@/types/callManager.types";

const fetchHooks: HooksMap = {
    songs: fetchSongs,
    songsById: fetchSongById,
    privateSongs: fetchPrivateSongs,
    artists: fetchArtists,
    artist: fetchArtist,
    playlists: fetchUserPlaylists,
    playlistSongs: fetchPlaylistSongs,
    user: fetchCurrentUser,    
    userPresets: fetchUserPresets,
}

const postHooks: HooksMap = {
    registerUser, loginUser, googleLogin, forgotPassword, resetPassword,
    logoutUser, createPlaylist, addSongToPlaylist, createPreset
};

const putHooks: HooksMap = {
    updatePlaylist, updatePreset, updateUsername, moveSongInPlaylist
};

const deleteHooks: HooksMap = {
    deleteUserPreset, deletePlaylist, deleteSongFromPlaylist,
};

function useCallManager<T extends HooksMap>(hooksMap: T) {
    const [state, setState] = useState<CallManagerState>({});
    const [loading, setLoading] = useState<CallManagerLoading>({});
    const [error, setError] = useState<CallManagerError>({});

    const call = useCallback(async (
        key: keyof T,
        ...args: any[]
    ) => {
        setLoading(prev => ({ ...prev, [key]: true }));
        setError(prev => ({ ...prev, [key]: null }));

        try {
            const fn = hooksMap[key];

            const data = await fn(...args);

            setState(prev => ({ ...prev, [key]: data }));

            return data;
        } catch (err: unknown) {
            const error = err instanceof Error
                ? err
                : new Error("Unknown error");

            setError(prev => ({ ...prev, [key]: error }));
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, [key]: false }));
        }
    }, [hooksMap]);

    return { state, loading, error, call };
}

export const usePostManager = () => useCallManager(postHooks);
export const useFetchManager = () => useCallManager(fetchHooks);
export const usePutManager = () => useCallManager(putHooks);
export const useDeleteManager = () => useCallManager(deleteHooks);
