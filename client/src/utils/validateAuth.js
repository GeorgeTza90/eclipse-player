import { validatePassword } from "./validatePassword";

export const validateAuth = ({ isLogin, username, email, password, confirmPassword }) => {

    // --- Basic field presence checks ---
    if (!isLogin && !username) throw new Error("Username is required");
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");
    if (!isLogin && password !== confirmPassword) throw new Error("Passwords do not match");

    // --- Email format ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error("Please enter a valid email address");

    // --- Registration-only checks ---
    if (!isLogin) {
        const passwordError = validatePassword(password);
        if (passwordError) throw new Error(passwordError);
    }
};