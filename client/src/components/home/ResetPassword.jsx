import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContextWeb";
import styles from "./resetPassword.module.css";
import Circle from "../../components/ui/Circle";
import PasswordInput from "../inputs/PasswordInput";
import AuthButton from "../buttons/AuthButton";
import { useIsMobile } from "../../hooks/useIsMobile";
import { resetPassword } from "../../services/PostService";

export default function ResetPasswordCard() {
    const shadowColor = "#bebebe";
    const [intensity] = useState(30);
    const isMobile = useIsMobile();

    const { login } = useAuth();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // --- Password validation ---
    const validatePassword = (pwd) => {
        if (!pwd) return "Password is required";
        if (pwd.length < 8) return "Password must be at least 8 characters long";
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd))
            return "Password must contain at least one special character";
        if (!/[A-Z]/.test(pwd))
            return "Password must contain at least one uppercase letter";
        return null;
    };

    const handleReset = async () => {
        if (!password || !confirmPassword)
            return setError("Please fill out both password fields.");

        const validationError = validatePassword(password);
        if (validationError) return setError(validationError);

        if (password !== confirmPassword)
            return setError("Passwords do not match.");

        try {
            setLoading(true);
            const res = await resetPassword(token, password);

            if (res.user && res.token) {
                login(res.user, res.token);   // auto-login
                navigate("/");                // redirect to home
            }
        } catch (err) {
            setError(err.message || "Failed to reset password. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!error) return;
        const timer = setTimeout(() => setError(""), 4000);
        return () => clearTimeout(timer);
    }, [error]);

    return (
        <div className={styles.authContainer}>
            <div className={`${styles.circleWrapper} ${styles.circle1}`}>
                <Circle
                    size={isMobile ? 400 : 600}
                    shadowColor={shadowColor}
                    intensity={intensity * 0.5}
                />
            </div>

            <div className={styles.formWrapper}>
                <h2 className={styles.title}>Reset Password</h2>

                <PasswordInput
                    value={password}
                    onChangeText={setPassword}
                    show={showPassword}
                    setShow={setShowPassword}
                    placeholder="New Password"
                />

                <PasswordInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    show={showConfirmPassword}
                    setShow={setShowConfirmPassword}
                    placeholder="Confirm Password"
                />

                <AuthButton
                    loading={loading}
                    isLogin={false}
                    onClick={handleReset}
                    title="Reset Password"
                />

                {error && <p className={styles.errorText}>{error}</p>}
            </div>
        </div>
    );
}
