import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextWeb';
import { API_URL } from "../../config";
import { useIsMobile } from '../../hooks/useIsMobile';
import { useMinimumLoading } from '../../hooks/useMinimumLoading.';
import MiniPlayerSettings from "./MiniPlayerSettings";
import AuthCard from './AuthCard';
import UserPlaylists from './UserPlaylists';
import AuthButton from '../ui/buttons/AuthButton';
import SettingsButton from "../ui/buttons/SettingsButton";
import Teaser from '../ui/teasers/Teaser';
import styles from "./homeScreen.module.css";

const HomeScreen = () => {
    const { user, logout, loading } = useAuth();
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    
    const showLoader = useMinimumLoading(loading, 2000);
    if (showLoader) return <Loader text="Checking login status"/>;

    return (
        <div className={styles.container}>
            <div style={{ display: 'none' }}>Eclipse Player is an online music player that lets you play playlists and stream Neperia and more content easily on any device.</div>
            
            {!user && <AuthCard />}

            {user && (
                <div className={styles.UserDiv}>
                    {/* Auth */}
                    <h2 className={styles.text}>Welcome, {user.username}!</h2>
                    <AuthButton title="Logout" loading={false} onClick={logout} width={isMobile ? '80%' : '90%'}/>
                    <SettingsButton title="Settings" loading={false} onClick={() => navigate("/user-settings")}width={isMobile ? '10%' : '5%'}/>

                    {/* Playlists */}
                    <h3 className={styles.text2}>Your Playlists</h3>
                    <UserPlaylists />                   
                </div>
            )}

        {/* Teasers */}        
                <div className={styles.teaserDiv}>
                    <Teaser 
                        link={`/library/CollectionDetail/${encodeURIComponent("No Gods In Heaven")}`} 
                        source={"/assets/vids/Video Teaser 2.mp4"}
                        video={true}
                    />
                    <Teaser
                        link = {`${API_URL}/api/download/apk?version=1.2.7`}
                        source={"/assets/images/App_Teaser_1.jpg"}
                        download
                        video={false}
                    />
                </div>
        </div>
    );
}

export default HomeScreen;