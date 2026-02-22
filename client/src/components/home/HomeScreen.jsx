import { useAuth } from '../../contexts/AuthContextWeb';
import MiniPlayerSettings from "./MiniPlayerSettings";
import AuthButton from '../buttons/AuthButton';
import AuthCard from './AuthCard';
import UserPlaylists from './UserPlaylists';
import styles from "./homeScreen.module.css";
import { useIsMobile } from '../../hooks/useIsMobile';
import Teaser from '../teasers/Teaser';

export default function HomeScreen() {
    const { user, logout, loading } = useAuth();
    const isMobile = useIsMobile();
    
    if (loading) {
        return (
            <div className={styles.container}>
                <p className={styles.infoText}>Checking login status...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div style={{ display: 'none' }}>
                Eclipse Player is an online music player that lets you play playlists and stream Neperia and more content easily on any device.
            </div>

            {!user && <AuthCard />}

            {user && (
                <div>
                    <h2 className={styles.text}>Welcome, {user.username}!</h2>
                    <AuthButton title="Logout" loading={false} onClick={logout} width='98%' />
                    
                    <h3 className={styles.text2}>Your Playlists</h3>
                    <UserPlaylists />

                    <h3 className={styles.text3}>Mini Player Settings</h3>
                    {!isMobile 
                        ? <MiniPlayerSettings /> 
                        : <p className={styles.notAvailable}>Mini Player is not available in Mobile View</p>
                    }

                    <Teaser 
                        link={`/library/CollectionDetail?album=${encodeURIComponent("No Gods In Heaven")}`} 
                        source={"/assets/vids/Video Teaser 2.mp4"} 
                    />
                </div>
            )}
        </div>
    );
}
