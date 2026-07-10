import { createContext, useState, useEffect, useContext } from "react";
import { useFetchManager, usePostManager } from "../hooks/useCallManager";
import { useAuthUser } from "./auth/useAuthUser";
import { useAuthSession } from "./auth/useAuthSession";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const { call: fetchCall } = useFetchManager();
    const { loading: postLoading, call: postCall } = usePostManager();

    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);    
    const loading = postLoading?.user;

    const priv_u = Boolean(user?.private);
    
    useAuthUser({ fetchCall, setUser, setAuthLoading });
    
    const { login, logout } = useAuthSession({ postCall, setUser});

    return (
        <AuthContext.Provider value={{ user, setUser, loading, authLoading, priv_u, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};