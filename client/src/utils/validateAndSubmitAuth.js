import { useState } from "react";

export const validateAndSubmitAuth = ({
        isLogin, username, email, password, confirmPassword, handleLogin, handleRegister
    }) => {       

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
            if (username.length < 3) throw new Error("Username must be at least 3 characters long");
            if (password.length < 8) throw new Error("Password must be at least 8 characters long");
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) throw new Error("Password must contain at least one special character");
            if (!/[A-Z]/.test(password)) throw new Error("Password must contain at least one uppercase letter");
        }

        // --- Submit ---
        // if (isLogin) handleLogin(email, password);
        // else handleRegister(username, email, password);
};
