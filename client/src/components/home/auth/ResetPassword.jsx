import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { usePostManager } from "../../../hooks/useCallManager";
import { useAutoClear } from "../../../hooks/useAutoClear";
import { validatePassword } from "../../../utils/validatePassword";
import Circle from "../../ui/circles/Circle";
import PasswordInput from "../../ui/inputs/PasswordInput";
import AuthButton from "../../ui/buttons/AuthButton";
import styles from "./resetPassword.module.css";

const ResetPasswordCard = () => {
    const { loading, error, call } = usePostManager();
    const [searchParams] = useSearchParams();
    const isMobile = useIsMobile();
    const navigate = useNavigate();

    const [intensity] = useState(30);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [localError, setLocalError] = useState("");
    const [message, setMessage] = useState("");

    const shadowColor = "#bebebe";
    const token = searchParams.get("token");

    useAutoClear(localError, setLocalError, 4000);

    if (!token) return (
        <div className={styles.authContainer}>
            <p className={styles.errorText}>Invalid or expired reset link. Please request a new one.</p>
        </div>
    );

    const handleReset = async () => {
        if (!password || !confirmPassword) return setLocalError("Please fill out both password fields.");

        const validationError = validatePassword(password);
        if (validationError) return setLocalError(validationError);
        if (password !== confirmPassword) return setLocalError("Passwords do not match.");

        try {
            const res = await call("resetPassword", token, password);
            if (res) {
                setMessage(res.message);
                navigate("/");
            }
        } catch (err) {
            setLocalError(err.message || "Failed to reset password. Try again later.");
        }
    };

    return (
        <div className={styles.authContainer}>
        {/* Decorative Circle */}
            <div className={`${styles.circleWrapper} ${styles.circle1}`}>
                <Circle
                    size={isMobile ? 400 : 500}
                    top={isMobile ? 100 : 150}
                    intensity={isMobile ? intensity * 0.6 : intensity * 0.8}
                    heightOffset={8}
                    shadowColor={shadowColor}
                />
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
                {message && <p className={styles.messageText}>{message}</p>}
            </div>
        </div>
    );
};

export default ResetPasswordCard;