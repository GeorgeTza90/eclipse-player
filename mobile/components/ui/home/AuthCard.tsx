import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import Circle from '@/components/ui/player/Circle';
import { useAuthActions } from '@/hooks/useAuthActions';
import AuthButton from '../buttons/authButtons';
import { validateAndSubmitAuth } from '@/utils/validateAndSubmitAuth';
import PasswordInput from '../inputs/PasswordInput';
import { googleLogin, forgotPassword } from '@/services/api';
import { GOOGLE_CLIENT_IDS } from '../../../config';

WebBrowser.maybeCompleteAuthSession();

export default function AuthCard() {
  const shadowColor = '#bebebe';
  const [intensity] = useState(30);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [localError, setLocalError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  
  const { handleLogin, handleRegister, loading, error } = useAuthActions();

  // --- Google Auth Session
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_IDS.expoClientId,
    iosClientId: GOOGLE_CLIENT_IDS.iosClientId,
    androidClientId: GOOGLE_CLIENT_IDS.androidClientId,
    webClientId: GOOGLE_CLIENT_IDS.webClientId,
    scopes: ['openid', 'profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const idToken = response.params.id_token || response.params.idToken;
      if (idToken) handleGoogleLogin(idToken);
    }
  }, [response]);

  const handleGoogleLogin = async (idToken: string) => {
    try {      
      const data = await googleLogin(idToken, "mobile");
      handleLogin(data.user, data.token);
    } catch (err: any) {
      console.error("Google login failed:", err);
      setLocalError(err.message || "Google login failed");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return setLocalError("Please enter your email first.");     
    try {
      const data = await forgotPassword(email);
      console.log("Forgot password response:", data); // debug
      setMessage(`An email to reset Password has been sent to: ${email}`);
    } catch (err: any) {
      console.error("Forgot password failed:", err);
      setLocalError("Failed to send reset email. Try again later.");
    }
  };

  useEffect(() => {
    if (!localError) return;
    const timer = setTimeout(() => setLocalError(null), 4000);
    return () => clearTimeout(timer);
  }, [localError]);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(''), 8000);
    return () => clearTimeout(timer);
  }, [message]);

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
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: -350, left: -195, zIndex: 0, justifyContent: 'center' }}>
        <Circle size={390} shadowColor={shadowColor} intensity={intensity} />
      </View>

      <View style={{ position: 'absolute', top: -190, left: -130, zIndex: 1 }}>
        {!isLogin && (
          <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
        )}
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
        <PasswordInput value={password} onChangeText={setPassword} show={showPassword} setShow={setShowPassword} placeholder="Password" />
        {!isLogin && (
          <PasswordInput value={confirmPassword} onChangeText={setConfirmPassword} show={showConfirmPassword} setShow={setShowConfirmPassword} placeholder="Confirm Password" />
        )}        

        {/* Google Login Button */}
        <TouchableOpacity
            disabled={!request}
            onPress={() => promptAsync()}
            style={styles.googleButton}
        >
            <Text style={styles.googleButtonText}>Login with Google</Text>
        </TouchableOpacity>
        <AuthButton loading={loading} isLogin={isLogin} onPress={onSubmit} />
        {(error || localError) && <Text style={{ color: 'red', marginTop: 12, maxWidth: 260 }}>{error || localError}</Text>}
        {message && <Text style={{ color: 'green', marginTop: 12, maxWidth: 260 }}>{message}</Text>}

        <View style={{ maxWidth: 260, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={{ marginTop: 10 }}>
            <Text style={{ color: '#888', marginTop: 8 }}>
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </Text>
          </TouchableOpacity>          
        </View>

        {/* Forgot Password */}
        {isLogin && (
          <TouchableOpacity onPress={handleForgotPassword} style={{ marginTop: 12, marginLeft: 70 }}>
            <Text style={{ color: '#888' }}>Forgot Password?</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 160 },
  input: { height: 45, color: "#131313ff", borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#fff', paddingRight: 40, marginBottom: 12 },
  googleButton: { backgroundColor: "#4285F4", paddingVertical: 12, paddingHorizontal: 15, borderRadius: 8, alignItems: "center",marginBottom: 10 },
  googleButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  switchText: { color: "#888", marginTop: 8, textAlign: "center" },
  errorText: { color: "red", marginTop: 12, textAlign: "center" },
});