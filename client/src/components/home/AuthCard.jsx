import { useState } from "react";
import styles from "./authCard.module.css";
import Circle from "../../components/ui/Circle";
import { useAuthActions } from "../../hooks/useAuthActions";
import AuthButton from "../buttons/AuthButton";
import { validateAndSubmitAuth } from "../../utils/validateAndSubmitAuth";
import { useIsMobile } from "../../hooks/useIsMobile";
import PasswordInput from "../inputs/PasswordInput";

export default function AuthCard() {
    const shadowColor = "#bebebe";
    const [intensity] = useState(30);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [localError, setLocalError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const isMobile = useIsMobile();
    const { handleLogin, handleRegister, loading, error } = useAuthActions();

    const onSubmit = () =>
        validateAndSubmitAuth({
            isLogin,
            username,
            email,
            password,
            confirmPassword,
            setLocalError,
            handleLogin,
            handleRegister,
        });

    return (
        <div className={styles.authContainer}>
            <div className={`${styles.circleWrapper} ${styles.circle1}`}>
                <Circle size={isMobile ? 400 : 600} shadowColor={shadowColor} intensity={intensity * 0.5} />
            </div>

            <div className={styles.formWrapper}>
                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                    />
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                />

                <PasswordInput
                    value={password}
                    onChangeText={setPassword}
                    show={showPassword}
                    setShow={setShowPassword}
                    placeholder="Password"
                />

                {!isLogin && (
                    <PasswordInput
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        show={showConfirmPassword}
                        setShow={setShowConfirmPassword}
                        placeholder="Confirm Password"
                    />
                )}

                <AuthButton loading={loading} isLogin={isLogin} onClick={onSubmit} />

                {(error || localError) && (
                    <p className={styles.errorText}>{error || localError}</p>
                )}

                <div className={styles.switchWrapper}>
                    <button
                        type="button"
                        className={styles.switchButton}
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin
                            ? "Don't have an account? Register"
                            : "Already have an account? Login"}
                    </button>


                </div>
            </div>
        </div>
    );
}
