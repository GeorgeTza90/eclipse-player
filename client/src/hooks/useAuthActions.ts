import { useState } from "react";
import { usePostManager } from "./useCallManager";
import { useAuth } from "@/contexts/AuthContextWeb.tsx";

export const useAuthActions = () => {
    const { call: postCall } = usePostManager();
    const { login } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (email: string, password: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const { user } = await postCall("loginUser", email, password);
            login(user);
        } catch (err) {
            setError((err as Error).message || "Login Failed");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (username: string, email: string, password: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const { user } = await postCall("registerUser", username, email, password);
            login(user);
        } catch (err) {
            setError((err as Error).message || "Register Failed");
        } finally {
            setLoading(false);
        }
    };

    return { handleLogin, handleRegister, loading, error };
};