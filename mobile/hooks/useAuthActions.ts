import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePostManager } from "./useCallManager";
import { registerUser, googleLogin } from "@/services/api"; // ✅ πρόσθεσε googleLogin

export default function useAuthActions() {
    const { loginWithEmail, loginWithUser } = useAuth();
    const { call: postCall } = usePostManager();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ---------- Login με email/password ----------
    const handleLogin = async (email: string, password: string) => {
        setLoading(true); 
        setError(null);
        try {
            await postCall("loginUser", email, password);
        } catch (err: any) {
            setError(err.message || "Login Failed");
        } finally {
            setLoading(false);
        }
    };

    // ---------- Login με Google ----------
    // const handleGoogleLogin = async (idToken: string) => {
    //     setLoading(true);
    //     setError(null);
    //     try {
    //         const data = await postCall("googleLogin", idToken, "mobile");
    //         await loginWithUser(data.user);
    //     } catch (err: any) {
    //         setError(err.message || "Google login failed");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // ---------- Register ----------
    const handleRegister = async (username: string, email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const newUser = await postCall("registerUser", username, email, password);
            await loginWithUser(newUser);
        } catch (err: any) {
            setError(err.message || "Register Failed");
        } finally {
            setLoading(false);
        }
    };

    return { handleLogin, handleRegister, loading, error };
}