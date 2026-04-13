import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { User, AuthContextType } from "@/types/auth";
import { getJSON, setJSON, removeItem } from "@/utils/localStorageManager";
import { useFetchManager, usePostManager } from "@/hooks/useCallManager";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { loading: fetchLoading, call: fetchCall } = useFetchManager();
    const { call: postCall } = usePostManager();
    const loading: boolean = fetchLoading?.user || false;
    const [user, setUser] = useState<User | null>(null);  

    useEffect(() => {
        const initAuth = async () => {
            try {
                const storedUser = await getJSON<User | null>("user", null);
                const currentUser = (await fetchCall("user")) as User | null;

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

    const loginWithEmail = async (email: string, password: string) => {
        if (!email || !password) throw new Error("Email and password are required");
        const userData: User = await postCall("loginUser", email, password);

        if (!userData) throw new Error("Login failed: No user data returned");

        setUser(userData);
        await setJSON("user", userData);
    };

    const loginWithUser = async (user: User) => {
        if (!user) return;
        setUser(user);
        await setJSON("user", user);
    };

    const logout = async () => {
        try { await postCall("logoutUser"); } catch {}
        setUser(null);
        await removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginWithEmail, loginWithUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};