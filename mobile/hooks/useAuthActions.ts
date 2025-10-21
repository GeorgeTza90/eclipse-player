import { useState } from "react";
import { loginUser, registerUser } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

export const useAuthActions = () => {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const { user, token } = await loginUser(email, password);
            login(user, token);
        } catch (err: any) {
            setError(err.message || "Login Failed");
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async (username: string, email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const { user, token } = await registerUser(username, email, password);
            login(user, token);
        } catch (err: any) {
            setError(err.message || "Register Failed");
        } finally {
            setLoading(false);
        }
    }

    return { handleLogin, handleRegister, loading, error };
};
