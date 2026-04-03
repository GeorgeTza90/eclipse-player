import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContextWeb";
import { useIsMobile } from "../../hooks/useIsMobile";
import { usePostManager } from "../../hooks/usePostManager";
import { useAutoClear } from "../../hooks/useAutoClear";
import styles from "./resetPassword.module.css";
import Circle from "../../components/ui/Circle";
import PasswordInput from "../inputs/PasswordInput";
import AuthButton from "../buttons/AuthButton";

export default function ResetPasswordCard() {
    const { loading, error, call } = usePostManager();    
    const { login } = useAuth();    
    const [searchParams] = useSearchParams();
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const [intensity] = useState(30);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [localError, setLocalError] = useState("");
    const shadowColor = "#bebebe";   

    //--- Password validation ---//
    const validatePassword = (pwd) => {
        if (!pwd) return "Password is required";
        if (pwd.length < 8) return "Password must be at least 8 characters long";
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd))
        return "Password must contain at least one special character";
        if (!/[A-Z]/.test(pwd)) return "Password must contain at least one uppercase letter";
        return null;
    };

    //--- Handle Reset Password ---//
    const handleReset = async () => {
        if (!password || !confirmPassword) return setLocalError("Please fill out both password fields.");

        const validationError = validatePassword(password);
        if (validationError) return setLocalError(validationError);

        if (password !== confirmPassword) return setLocalError("Passwords do not match.");

        try {      
            const res = await call("resetPassword", password, searchParams.get("token"));
            if (res.user && res.token) { login(res.user, res.token); navigate("/"); }
        } catch (err) {
            setLocalError(err.message || "Failed to reset password. Try again later.");
        }
    };
    
    useAutoClear(localError, setLocalError, 4000);

    return (
        <div className={styles.authContainer}>
    {/* Decorative Circle */}
            <div className={`${styles.circleWrapper} ${styles.circle1}`}>
                <Circle size={isMobile ? 400 : 600} shadowColor={shadowColor} intensity={intensity * 0.5} />
            </div>

    {/* Form */}
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
                    loading={loading.resetPassword}
                    isLogin={false}
                    onClick={handleReset}
                    title="Reset Password"
                />
    {/* Error */}
                {(localError || error.resetPassword) && (
                    <p className={styles.errorText}>{localError || error.resetPassword?.message}</p>
                )}
            </div>
        </div>
    );
}