import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { useMinimumLoading } from '@/hooks/useMinimumLoading';
import AuthCard from './auth/AuthCard';
import UserPlaylists from './playlists/UserPlaylists';
import AuthButton from '../ui/buttons/AuthButtons';
import Teaser from '../ui/teasers/Teaser';
import Loader from '../ui/loaders/Loader';
import SettingsButton from '../ui/buttons/SettingsButton';
import StatsButton from '../ui/buttons/StatsButton';

export default function Home() {    
    const { user, logout, loading } = useAuth();

    const handlePressSettings = (): void => router.push(`/home/Settings`);
    const handlePressStats = ():void => router.push(`/home/Stats`);

    const showLoader = useMinimumLoading(loading, 1500);
    if (showLoader) return <Loader text="Checking login status"/>;

    return (
        <SafeAreaView style={styles.container}>

            {!user && <AuthCard />}

            {user && (
                <View style={styles.userSection}>                    
                    <Text style={styles.text}>Welcome, {user.username}!</Text>
                    <View style={styles.userOptions}>
                        <AuthButton title="Logout" loading={false} onPress={logout} width="55%"/>
                        <SettingsButton title="Settings" loading={false} onPress={() => handlePressSettings()} />
                        <StatsButton title="Settings" loading={false} onPress={() => handlePressStats()} />
                    </View>
                    
                    
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
    userOptions: {flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center"},
    text: { color: "#fff", fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    text2: { color: "#fff", fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginTop: 25 },
    playlistsWrapper: { flex: 1 },
    teaserWrapper: { flex: 1, marginTop: 320, zIndex: 10 },
});