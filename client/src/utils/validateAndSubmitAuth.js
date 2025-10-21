export const validateAndSubmitAuth = ({
  isLogin,
  username,
  email,
  password,
  confirmPassword,
  setLocalError,
  handleLogin,
  handleRegister,
}) => {
  setLocalError(null);

  // --- Basic field presence checks ---
  if (!isLogin && !username) return setLocalError("Username is required");
  if (!email) return setLocalError("Email is required");
  if (!password) return setLocalError("Password is required");
  if (!isLogin && password !== confirmPassword)
    return setLocalError("Passwords do not match");

  // --- Email format ---
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return setLocalError("Please enter a valid email address");

  // --- Registration-only checks ---
  if (!isLogin) {
    if (username.length < 3)
      return setLocalError("Username must be at least 3 characters long");
    if (password.length < 8)
      return setLocalError("Password must be at least 8 characters long");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return setLocalError("Password must contain at least one special character");
    if (!/[A-Z]/.test(password))
      return setLocalError("Password must contain at least one uppercase letter");
  }

  // --- Submit ---
  if (isLogin) handleLogin(email, password);
  else handleRegister(username, email, password);
};
