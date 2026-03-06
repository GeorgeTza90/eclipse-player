import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { User, AuthContextType } from "@/types/auth";
import { getJSON, setJSON, removeItem } from "@/utils/localStorageManager";
import { fetchCurrentUser, loginUser, logoutUser } from "@/services/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ---------- INIT AUTH ----------
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = await getJSON<User | null>("user", null);
        const currentUser = await fetchCurrentUser() as User | null;
        if (currentUser) {
          setUser(currentUser);
          await setJSON("user", currentUser);
        } else {
          setUser(storedUser);
        }
      } catch (err) {
        console.error("Error fetching current user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  // ---------- LOGIN ----------
  const login = async (email: string, password: string) => {
    if (!email || !password) throw new Error("Email and password are required");

    try {      
      const userData: User = await loginUser(email, password) as User;
      setUser(userData);
      await setJSON("user", userData);
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  // ---------- LOGOUT ----------
  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
      await removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};