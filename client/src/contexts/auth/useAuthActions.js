import { useCallback } from "react";

export const useAuthActions = ({ postCall, setUser }) => {
    const login = useCallback((userData) =>  setUser(userData), [setUser]);

    const logout = useCallback(async () => {
        try {
            await postCall("logoutUser");
        } catch (err) {
            console.error(err);
        } finally {
            setUser(null);
        }
    }, [postCall, setUser]);

    return { login, logout };
};