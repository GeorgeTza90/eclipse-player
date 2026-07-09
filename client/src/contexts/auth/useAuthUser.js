import { useEffect } from "react";

export const useAuthUser = ({ fetchCall, setUser, setAuthLoading }) => {
    useEffect(() => {
        const initAuth = async () => {
            try {
                const currentUser = await fetchCall("user");
                setUser(currentUser);
            } catch (err) {
                setUser(null);
            } finally {
                setAuthLoading(false);
            }
        };

        initAuth();
    }, [fetchCall, setUser, setAuthLoading]);
};