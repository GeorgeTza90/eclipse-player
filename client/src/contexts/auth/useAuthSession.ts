import { useCallback } from "react";
import { logger } from "@/utils/logger";
import type { AuthSessionProps } from "@/types/auth.types";

export const useAuthSession = ({ postCall, setUser }: AuthSessionProps) => {
    const login = useCallback((userData) => setUser(userData), [setUser]);

    const logout = useCallback(async (): Promise<void> => {
        try {
            await postCall("logoutUser");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Unknown logout error";
            logger.error("Logout request failed", { error: message });
        } finally {
            setUser(null);
        }
    }, [postCall, setUser]);

    return { login, logout };
};