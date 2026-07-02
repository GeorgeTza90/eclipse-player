import { createContext, useState, useEffect, useContext } from "react";
import { useFetchManager, usePostManager } from "../hooks/useCallManager";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const { call: fetchCall } = useFetchManager();
    const { loading: postLoading, call: postCall } = usePostManager();

    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);    
    const loading = postLoading?.user;

    const priv_u = Boolean(user?.private);

    /* --- USER UPDATE --- */
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
    }, [fetchCall]);
    
    /* --- LOG ACTIONS --- */
    const login = (userData) => setUser(userData);

    const logout = async () => {
        try {
            await postCall("logoutUser");
        } catch (err) {
            console.error(err);
        } finally {
            setUser(null);
        }
    };

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