import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Circle from '@/components/ui/player/Circle';
import { useAuthActions } from '@/hooks/useAuthActions';
import AuthButton from '../buttons/authButtons';
import { validateAndSubmitAuth } from '@/utils/validateAndSubmitAuth';
import PasswordInput from '../inputs/PasswordInput';

export default function AuthCard() {
    const shadowColor = '#bebebe';
    const [intensity] = useState(30);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [localError, setLocalError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { handleLogin, handleRegister, loading, error } = useAuthActions();

      const onSubmit = () =>
        validateAndSubmitAuth({
            isLogin, username, email, password, confirmPassword,
            setLocalError, handleLogin, handleRegister,
        });

    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', top: -350, left: -195, zIndex: 0 }}>
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

                <AuthButton loading={loading} isLogin={isLogin} onPress={onSubmit} />

                <View style={{ maxWidth: 260, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={{ marginTop: 10 }}>
                        <Text style={{ color: '#888', marginTop: 8 }}>
                            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                        </Text>
                    </TouchableOpacity>
                    {(error || localError) && <Text style={{ color: 'red', marginTop: 12 }}>{error || localError}</Text>}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 160 },
    inputWrapper: { position: 'relative', width: 260 },
    input: { height: 40, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#fff', paddingRight: 40, marginBottom: 12 },
    eyeIcon: { position: 'absolute', right: 10, top: 10 },
    button: { backgroundColor: "#2f2d2dff", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, alignItems: "center" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" }
});
