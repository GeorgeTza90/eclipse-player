import { createContext, useState, useEffect, useContext } from "react";
import { useFetchManager, usePostManager } from "../hooks/useCallManager";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const { call: fetchCall } = useFetchManager();
    const { loading: postLoading, call: postCall } = usePostManager();

    const [user, setUser] = useState(null);    
    const [priv_u, setPriv_u] = useState(false); 
    const loading = postLoading?.user;

    /* --- USER UPDATE --- */
    useEffect(() => {
        const initAuth = async () => {
            try { 
                const currentUser = await fetchCall("user"); 
                setUser(currentUser);
            } catch (err) {
                console.error("Error fetching current user:", err); 
                setUser(null); 
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
  
    /* --- PRIVATE USER CHECK --- */
    useEffect(() => { if (user?.private) {setPriv_u(true)} else {setPriv_u(false)} }, [user]);


    return (
        <AuthContext.Provider value={{ user, loading, priv_u, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};