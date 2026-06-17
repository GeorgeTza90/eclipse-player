import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import AuthCard from './AuthCard';
import UserPlaylists from './UserPlaylists';
import AuthButton from '../ui/buttons/authButtons';
import Teaser from '../ui/teasers/Teaser';

export default function Home() {    
    const { user, logout, loading } = useAuth();     

    if (loading) return null;

    return (
        <SafeAreaView style={styles.container}>

            {!user && <AuthCard />}

            {user && (
                <View style={styles.userSection}>                    
                    <Text style={styles.text}>Welcome, {user.username}!</Text>
                    <AuthButton title="Logout" loading={false} onPress={logout}/>
                    <Text style={styles.text2}>Your Playlists</Text>                    
                    <View style={styles.playlistsWrapper}>
                        <UserPlaylists />
                    </View>
                </View>                
            )}
            
            <View style={styles.teaserWrapper}>
                <Teaser 
                    link={`/library/CollectionDetail?album=${encodeURIComponent("No Gods In Heaven")}`}
                    source={require("@/assets/vids/video_teaser_2.mp4")}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    userSection: { flex: 1, paddingHorizontal: 20 },
    text: { color: "#fff", fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    text2: { color: "#fff", fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginTop: 25 },
    playlistsWrapper: { flex: 1 },
    teaserWrapper: { flex: 1, marginTop: 320, zIndex: 10 },
});