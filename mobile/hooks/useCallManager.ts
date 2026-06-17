import { useCallback, useState } from "react";
import { fetchArtist, fetchPlaylistSongs, fetchSongs, fetchSongById, fetchUserPlaylists, fetchArtists, fetchCurrentUser, logoutUser } from "../services/api";
import { addSongToPlaylist, createPlaylist, forgotPassword, loginUser, googleLogin, moveSongInPlaylist, registerUser, resetPassword, updatePlaylist } from "../services/api";
import { deletePlaylist, deleteSongFromPlaylist } from "../services/api";
import { HookMap, StateType, LoadingType, ErrorType } from "@/types/callManager";

const fetchHooks = {
    songs: fetchSongs,
    songsById: fetchSongById,    
    artists: fetchArtists,
    artist: fetchArtist,    
    playlists: fetchUserPlaylists,
    playlistSongs: fetchPlaylistSongs,
    user: fetchCurrentUser,
    logout: logoutUser,    
} satisfies HookMap;

const postHooks = {
    registerUser, loginUser, googleLogin, forgotPassword, resetPassword, logoutUser,
    createPlaylist, updatePlaylist, addSongToPlaylist, moveSongInPlaylist,    
} satisfies HookMap;

const deleteHooks = {
    deletePlaylist, deleteSongFromPlaylist,
} satisfies HookMap;

function useCallManager<T extends HookMap>(hooksMap: T) {    
    const [state, setState] = useState<StateType<T>>({});
    const [loading, setLoading] = useState<LoadingType<T>>({});
    const [error, setError] = useState<ErrorType<T>>({});

    const call = useCallback(async <K extends keyof T> (key: K, ...args: Parameters<T[K]>): Promise<Awaited<ReturnType<T[K]>>> => {
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