import { createContext, useState, useEffect, useContext } from "react";
import { fetchCurrentUser, logoutUser } from "../services/GetService";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [priv_u, setPriv_u] = useState(false);  

  /* --- USER UPDATE --- */
  useEffect(() => {
    const initAuth = async () => {
      try { const currentUser = await fetchCurrentUser(); setUser(currentUser);}
      catch (err) { console.error("Error fetching current user:", err); setUser(null); }
      finally { setLoading(false); }
    };
    initAuth();
  }, []);
  
  /* --- LOG ACTIONS --- */
  const login = (userData) => setUser(userData);

  const logout = async () => {
    try {
      await logoutUser();
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
