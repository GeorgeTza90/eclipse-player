import { useCallback, useState } from "react";
import { addSongToPlaylist, createPlaylist, createPreset, forgotPassword, googleLogin, moveSongInPlaylist, registerUser, resetPassword, updatePlaylist, updatePreset } from "../services/PostService";

const postHooks = {
    registerUser, googleLogin, forgotPassword,resetPassword,
    createPlaylist, updatePlaylist, addSongToPlaylist, moveSongInPlaylist,
    createPreset, updatePreset,
};

export function usePostManager() {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});

  const call = useCallback(async (key, ...args) => {
    setLoading(prev => ({ ...prev, [key]: true }));
    setError(prev => ({ ...prev, [key]: null }));
    try {
      const data = await postHooks[key](...args);
      setState(prev => ({ ...prev, [key]: data }));
      return data;
    } catch (err) {
      setError(prev => ({ ...prev, [key]: err }));
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  }, []);

  return { state, loading, error, call };
}