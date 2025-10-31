import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContextWeb";
import { useAuthActions } from "../../hooks/useAuthActions";
import { validateAndSubmitAuth } from "../../utils/validateAndSubmitAuth";
import { useIsMobile } from "../../hooks/useIsMobile";
import { googleLogin, forgotPassword } from "../../services/PostService";
import { GOOGLE_CLIENT_ID } from "../../config";
import AuthButton from "../buttons/AuthButton";
import styles from "./authCard.module.css";
import Circle from "../../components/ui/Circle";
import PasswordInput from "../inputs/PasswordInput";

export default function AuthCard() {
    const { login } = useAuth();
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
    const [message, setMessage] = useState("");
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

    const onGoogleLogin = () => {
        const client = window.google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_CLIENT_ID,
            scope: 'openid email profile',
            callback: async (response) => {
                try {
                    const data = await googleLogin(response.access_token, "web");
                    login(data.user, data.token);
                } catch (err) {
                    console.error("Google login failed:", err);
                    alert(err.message || "Google login failed");
                }
            },
        });

        client.requestAccessToken({ prompt: 'select_account' });
    };

    const handleForgotPassword = async () => {
        if (!email) return setLocalError("Please enter your email first.");
        try {
            await forgotPassword(email);
            setMessage(`An email to reset Password has been send to: ${email}`);
        } catch (err) {
            setLocalError("Failed to send reset email. Try again later.");
        }
    };

    useEffect(() => {
        if (!localError) return;
        const timer = setTimeout(() => { setLocalError("") }, 4000);
        return () => clearTimeout(timer);
    }, [localError])

    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => { setMessage("") }, 8000);
        return () => clearTimeout(timer);
    }, [message])

    return (
        <div className={styles.authContainer}>
            {/* Circle */}
            <div className={`${styles.circleWrapper} ${styles.circle1}`}>
                <Circle size={isMobile ? 400 : 600} shadowColor={shadowColor} intensity={intensity * 0.5} />
            </div>

            {/* Log/Reg Form */}
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

                {/* Google login button */}
                <button type="button" onClick={onGoogleLogin} className={styles.googleButton}>
                    Login with Google
                </button>

                {/* Submit Button & Error */}
                <AuthButton loading={loading} isLogin={isLogin} onClick={onSubmit} />
                {(error || localError) && (<p className={styles.errorText}>{error || localError}</p>)}
                {message && (<p className={styles.messageText}>{message}</p>)}

                {/* Log/Reg Switcher */}
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

                {/* Forgot Password */}
                <div className={styles.switchWrapper}>
                    <button
                        type="button"
                        className={styles.switchButton}
                        onClick={() => handleForgotPassword()}
                    >
                        {isLogin && "Forgot Password?"}
                    </button>
                </div>
            </div>
        </div>
    );
}
