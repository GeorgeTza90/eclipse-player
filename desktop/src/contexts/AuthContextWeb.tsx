import { createContext, useContext, useState } from "react";
import { useFetchManager, usePostManager } from "@/hooks/useCallManager";
import { useAuthUser } from "./auth/useAuthUser";
import { useAuthSession } from "./auth/useAuthSession";
import type { AuthContextValue, AuthProviderProps, User } from "@/types/auth.types";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { call: fetchCall } = useFetchManager();
    const { loading: postLoading, call: postCall } = usePostManager();

    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState<boolean>(true);

    const loading = Boolean(postLoading.user);
    const priv_u = Boolean(user?.private);

    useAuthUser({ fetchCall, setUser, setAuthLoading });

    const { login, logout } = useAuthSession({ postCall, setUser });

    const value: AuthContextValue = { user, setUser, loading, authLoading, priv_u, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};