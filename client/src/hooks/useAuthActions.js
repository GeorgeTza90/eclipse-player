import { useState } from "react";
import { loginUser, registerUser } from "../services/PostService";
import { useAuth } from "../contexts/AuthContextWeb";

export const useAuthActions = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { user, token } = await loginUser(email, password);
      login(user, token);
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
      const { user, token } = await registerUser(username, email, password);
      login(user, token);
    } catch (err) {
      setError(err.message || "Register Failed");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleRegister, loading, error };
};
