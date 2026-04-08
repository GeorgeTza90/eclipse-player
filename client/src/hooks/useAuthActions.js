import { useState } from "react";
import { usePostManager } from "./useCallManager";
import { useAuth } from "../contexts/AuthContextWeb";

export const useAuthActions = () => {
  const { call: postCall } = usePostManager();

  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { user } = await postCall("loginUser", email, password);
      login(user);
    } catch (err) {
      setError(err.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { user } = await postCall("registerUser", username, email, password);
      login(user);
    } catch (err) {
      setError(err.message || "Register Failed");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleRegister, loading, error };
};
