import { useEffect } from "react";
import { UseAuthUserProps, User } from "@/types/auth";
import { getJSON, setJSON } from "@/utils/localStorageManager";

export function useAuthUser({ fetchCall, setUser }: UseAuthUserProps) {
    useEffect(() => {
        const initAuth = async () => {
            try {
                const storedUser = await getJSON<User | null>("user", null);

                let currentUser: User | null = null;
                try {
                    currentUser = (await fetchCall("user")) as User | null;
                } catch {
                    currentUser = null;
                }

                if (currentUser) {
                    setUser(currentUser);
                    await setJSON("user", currentUser);
                } else if (storedUser) {
                    setUser(storedUser);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            }
        };

        initAuth();
    }, []);
}