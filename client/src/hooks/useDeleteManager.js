import { useCallback, useState } from "react";
import { deleteUserPreset } from "../services/DeleteService";

const apiHooks = {
    deleteUserPreset
}

export function useDeleteManager() {
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