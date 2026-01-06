import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { User } from "@/types/auth";
import { getJSON, setJSON, removeItem } from "@/utils/localStorageManager";

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (userData: User, tokenData: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const storedUser = await getJSON<User | null>("user", null);
      const storedToken = await getJSON<string | null>("token", null);
      setUser(storedUser);
      setToken(storedToken);
    })();
  }, []);

  const login = async (userData: User, tokenData: string) => {
    setUser(userData);
    setToken(tokenData);
    await setJSON("user", userData);
    await setJSON("token", tokenData);
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await removeItem("user");
    await removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
