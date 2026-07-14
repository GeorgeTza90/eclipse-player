import React, { createContext, useState, useContext, ReactNode } from "react";
import { User, AuthContextType } from "@/types/auth";
import { useFetchManager, usePostManager } from "@/hooks/useCallManager";
import { useAuthUser } from "./auth/useAuthUser";
import { useAuthSession } from "./auth/useAuthSession";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { loading: fetchLoading, call: fetchCall } = useFetchManager();
    const { call: postCall } = usePostManager();
    const loading: boolean = fetchLoading?.user || false;
    const [user, setUser] = useState<User | null>(null);

    const priv_u = Boolean(user?.private);

    useAuthUser({ fetchCall, setUser });
    const { loginWithUser, logout } = useAuthSession({ postCall, setUser });

    return (
        <AuthContext.Provider value={{ user, loading, priv_u, loginWithUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};