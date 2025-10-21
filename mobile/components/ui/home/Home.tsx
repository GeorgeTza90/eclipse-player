import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import AuthButton from '../buttons/authButtons';
import AuthCard from './AuthCard';
import UserPlaylists from './UserPlaylists'

export default function Home() {
    const { user, token, logout } = useAuth();

    return (
        <View style={styles.container}>   
            {!user && (
                <AuthCard />                    
            )}   
            {user && token && (
                <View style={{ marginTop: -100 }}>                    
                    <Text style={styles.text}>Welcome, {user.username}!</Text>
                    <AuthButton title="Logout" loading={false} onPress={logout} />   
                    <Text style={styles.text2}>Your Playlists</Text>
                    <UserPlaylists token={token} />                 
                </View>                
            )}                    
        </View>
    );
}
    
const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 160 },
    text: { color: "#fff", fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    text2: { color: "#fff", fontSize: 18, fontWeight: 'bold', marginBottom: -10, marginTop: 25 },   
});  