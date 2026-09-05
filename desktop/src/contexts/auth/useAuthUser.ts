import { useEffect } from "react";
import type { AuthUserProps } from "@/types/auth.types";

export const useAuthUser = ({ fetchCall, setUser, setAuthLoading }: AuthUserProps): void => {
    useEffect(() => {
        const initAuth = async (): Promise<void> => {
            try {
                const currentUser = await fetchCall("user");
                setUser(currentUser);
            } catch {
                setUser(null);
            } finally {
                setAuthLoading(false);
            }
        };

        initAuth();
    }, [ fetchCall, setUser, setAuthLoading ]);
};