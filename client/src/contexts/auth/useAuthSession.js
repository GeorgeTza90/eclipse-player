import { useCallback } from "react";
import { logger } from "../../utils/logger";

export const useAuthSession = ({ postCall, setUser }) => {
    const login = useCallback((userData) =>  setUser(userData), [setUser]);

    const logout = useCallback(async () => {
        try {
            await postCall("logoutUser");
        } catch (err) {            
            logger.error("Logout request failed", { error: err.message });
        } finally {
            setUser(null);
        }
    }, [postCall, setUser]);

    return { login, logout };
};