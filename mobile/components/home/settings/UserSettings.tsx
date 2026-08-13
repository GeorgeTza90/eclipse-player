import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { usePostManager, usePutManager } from '@/hooks/useCallManager';
import { useAutoClear } from '@/hooks/useAutoClear';
import LoadingMessage from '../../ui/loaders/LoadingMessage';
import FormInput from '../../ui/inputs/FormInput';

export default function UserSettings() {
    const { call: postCall } = usePostManager();
    const { call: putCall } = usePutManager();
    const { user, setUser, loading: authLoading } = useAuth();

    const [username, setUsername] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);
    const [message, setMessage] = useState('');

    /* --- AUTO-CLEAR --- */
    useAutoClear(localError, setLocalError, 4000);
    useAutoClear(message, setMessage, 6000);

    /* --- UPDATE USERNAME --- */
    useEffect(() => {
        if (user?.username) setUsername(user.username || '');
    }, [user]);

    /* --- LOADING --- */
    if (authLoading) return <LoadingMessage message="Loading User Info ..." height="20%" />;

    const updateUsername = async (username: string) => {
        if (!user) return;
        try {
            await putCall('updateUsername', username);
            setUser((prev: any) => ({ ...prev, username }));
            setMessage('Username Updated');
        } catch (err: any) {
            setLocalError(err.message || 'Failed to update username');
        }
    };

    const getPremium = () => setLocalError('Premium service is not available yet');

    const handleForgotPassword = async (email: string) => {
        if (!user) return;
        try {
            await postCall('forgotPassword', email);
            setMessage(`An email to reset Password has been sent to: ${email}`);
        } catch {
            setLocalError('Failed to send reset email. Try again later.');
        }
    };

    return (
        <View>
            {/* Username */}
            <View style={styles.userInfo}>
                <Text style={styles.label}>Username:</Text>
                <View style={styles.row}>
                    <View style={styles.inputWrapper}>
                        <FormInput placeholder="Username" value={username} onChangeText={setUsername} isForm={false} />
                    </View>
                    <Pressable style={styles.updateButton} onPress={() => updateUsername(username)}>
                        <Text style={styles.updateButtonText}>↺</Text>
                    </Pressable>
                </View>
            </View>

            {/* Premium */}
            <View style={styles.userInfo}>
                <Text style={styles.label}>Premium User:</Text>
                <Text style={styles.value}>{user?.premium ? 'Yes' : 'No'}</Text>
                {!user?.premium && (
                    <Pressable style={styles.premiumButton} onPress={getPremium}>
                        <Text style={styles.premiumButtonText}>Get Premium</Text>
                    </Pressable>
                )}
            </View>

            {/* Email */}
            <View style={styles.userInfo}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{user?.email}</Text>
            </View>

            <Pressable style={styles.switchButton} onPress={() => user?.email && handleForgotPassword(user?.email)}>
                <Text style={styles.switchButtonText}>Change Password</Text>
            </Pressable>
            
            <View style={styles.infoDiv}>
                {(error => error)(localError) && <Text style={styles.error}>{localError}</Text>}
                {!!message && <Text style={styles.message}>{message}</Text>}
            </View>            
        </View>
    );
}

const styles = StyleSheet.create({
    userInfo: { marginBottom: 16, flex: 1, flexDirection: "row", alignItems: "center", gap: 20, width: 280, padding: 7 },
    label: { color: '#fff', fontSize: 14, marginBottom: 4 },
    value: { color: '#ccc', fontSize: 14 },
    row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    inputWrapper: { flex: 1 },
    updateButton: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#2f2d2dff', borderRadius: 6 },
    updateButtonText: { color: '#fff', fontSize: 16 },
    premiumButton: { marginTop: 6, alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#2f2d2dff', borderRadius: 6 },
    premiumButtonText: { color: '#fff', fontSize: 13 },
    switchButton: { marginTop: 8, alignSelf: 'flex-start', paddingVertical: 8, paddingHorizontal: 14, backgroundColor: '#2f2d2dff', borderRadius: 6 },
    switchButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
    infoDiv: {height: 50, width: 350},
    error: { color: 'red', marginTop: 12 },
    message: { color: 'green', marginTop: 12 },
});