import { createContext, useState, useContext } from "react";
import { getJSON, getUserJSON, removeJSON, setJSON, setUserJSON } from "../utils/localStorageManager";
import { decode, encode } from "../utils/encoder";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => getUserJSON("user", null));
    const [token, setToken] = useState(() => decode(getJSON("token", null)));

    const login = (userData, tokenData) => {
        setUser(userData);
        setToken(tokenData);
        setUserJSON("user", userData);
        setJSON("token", encode(tokenData));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        removeJSON("user");
        removeJSON("token");
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
