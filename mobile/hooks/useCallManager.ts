import { useCallback, useState } from "react";
import { fetchArtist, fetchPlaylistSongs, fetchSongs, fetchSongById, fetchUserPlaylists, fetchPrivateSongs, fetchArtists, fetchCurrentUser } from "../services/GetService";
import { addSongToPlaylist, createPlaylist, forgotPassword, loginUser, googleLogin, logoutUser, registerUser, resetPassword } from "../services/PostService";
import { updateUsername, moveSongInPlaylist, updatePlaylist } from "../services/PutService";
import { deletePlaylist, deleteSongFromPlaylist } from "../services/DeleteService";
import { HookMap, StateType, LoadingType, ErrorType } from "@/types/callManager";

const fetchHooks = {
    user: fetchCurrentUser,
    songs: fetchSongs,
    songsById: fetchSongById,
    privateSongs: fetchPrivateSongs,
    artists: fetchArtists,
    artist: fetchArtist,
    playlists: fetchUserPlaylists,
    playlistSongs: fetchPlaylistSongs,
} satisfies HookMap;

const postHooks = {
    loginUser, registerUser, googleLogin, logoutUser,
    forgotPassword, resetPassword, createPlaylist, addSongToPlaylist,
} satisfies HookMap;

const putHooks = {
    updateUsername, updatePlaylist, moveSongInPlaylist,
} satisfies HookMap;

const deleteHooks = {
    deletePlaylist, deleteSongFromPlaylist,
} satisfies HookMap;

export function useCallManager<T extends HookMap>(hooksMap: T) {    
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
export const usePutManager = () => useCallManager(putHooks);
export const useDeleteManager = () => useCallManager(deleteHooks);