import { useState } from "react";
import { useAuth } from "../../contexts/AuthContextWeb";
import { useIsMobile } from "../../hooks/useIsMobile";
import { usePostManager } from "../../hooks/useCallManager";
import { useAutoClear } from "../../hooks/useAutoClear";
import { GOOGLE_CLIENT_ID } from "../../config";
import AuthButton from "../ui/buttons/AuthButton";
import PasswordInput from "../ui/inputs/PasswordInput";
import Circle from "../ui/circles/Circle";
import FormInput from "../ui/inputs/FormInput";
import styles from "./authCard.module.css";
import { validateAndSubmitAuth } from "../../utils/validateAndSubmitAuth";

const AuthCard = () => {
    const { loading, error, call } = usePostManager();
    const { login } = useAuth();    
    const isMobile = useIsMobile();

    const [intensity] = useState(30);    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [localError, setLocalError] = useState(null);
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);        
    
    const currentError = isLogin ? error.loginUser : error.registerUser;
    const shadowColor = "#bebebe";

    useAutoClear(localError, setLocalError, 4000);
    useAutoClear(message, setMessage, 8000);    
    
    const onSubmit = async () => {
        const mode = isLogin;
        let data;        
        try {
            validateAndSubmitAuth({ isLogin, username, email, password, confirmPassword });
            if (mode) {                
                data = await call("loginUser", email, password);                
            } else {                
                data = await call("registerUser", username, email, password, confirmPassword);                
            }
            login(data.user);
        } catch (err) {            
            setLocalError(err.message || "Something went wrong");
        }
    };
    
    const onGoogleLogin = () => {
        const client = window.google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_CLIENT_ID,
            scope: "openid email profile",
            callback: async (response) => {
                try {
                    const data = await call("googleLogin", response.access_token, "web");
                    login(data.user, data.token);
                } catch (err) {                    
                    setLocalError(err.message || "Google login failed");
                }
            },
        });
        client.requestAccessToken({ prompt: "select_account" });
    };

    const handleForgotPassword = async () => {
        if (!email) return setLocalError("Please enter your email first.");
        try {
            await call("forgotPassword", email);
            setMessage(`An email to reset Password has been sent to: ${email}`);
        } catch {
            setLocalError("Failed to send reset email. Try again later.");
        }
    };

    return (
        <div className={styles.authContainer}>        
            <Circle size={isMobile ? 400 : 500} top={isMobile ? 100 : 150} intensity={isMobile ? intensity * 0.6 : intensity * 0.8} heightOffset={8} shadowColor={shadowColor}/>
    
    {/* Form */}
            <div className={styles.formWrapper}>
                <div className={styles.authButtonsDiv}>
                    {!isLogin && (
                        <FormInput
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}                        
                        />
                    )}

                    <FormInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}                    
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
                    <button
                        type="button"
                        onClick={onGoogleLogin}
                        className={styles.googleButton}
                        disabled={loading.googleLogin}
                    >
                        {isLogin ? "Login with Google" : "Register with Google"}
                    </button>

                    <AuthButton
                        loading={loading.registerUser || loading.loginUser}
                        isLogin={isLogin}
                        onClick={onSubmit}                    
                    />
                </div>

                

    {/* Error Message */}
                {(currentError || localError) && (
                    <p className={styles.errorText}>
                        {currentError?.message || localError}
                    </p>
                )}
                {message && <p className={styles.messageText}>{message}</p>}

    {/* Switcher */}
                <div className={styles.switchWrapper}>
                    <button type="button" className={styles.switchButton} onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                    </button>
                </div>

    {/* Forgot Password */}
                {isLogin && (
                    <div className={styles.switchWrapper}>
                        <button
                            type="button"
                            className={styles.switchButton}
                            onClick={handleForgotPassword}
                            disabled={loading.forgotPassword}
                        >
                            Forgot Password?
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}


export default AuthCard;