export function validatePassword(pwd) {
    if (!pwd) return "Password is required";
    if (pwd.length < 8) return "Password must be at least 8 characters long";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return "Password must contain at least one special character";
    if (!/[A-Z]/.test(pwd)) return "Password must contain at least one uppercase letter";
    return null;
}