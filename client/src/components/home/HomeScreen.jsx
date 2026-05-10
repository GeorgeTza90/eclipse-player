import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextWeb';
import { useIsMobile } from '../../hooks/useIsMobile';
import { API_URL } from "../../config";
import { useMinimumLoading } from '../../hooks/useMinimumLoading.';
import MiniPlayerSettings from "./MiniPlayerSettings";
import AuthButton from '../buttons/AuthButton';
import SettingsButton from "../buttons/SettingsButton";
import AuthCard from './AuthCard';
import UserPlaylists from './UserPlaylists';
import Teaser from '../teasers/Teaser';
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
                        link={`/library/CollectionDetail?album=${encodeURIComponent("No Gods In Heaven")}`} 
                        source={"/assets/vids/Video Teaser 2.mp4"}
                        video={true}
                    />
                    <Teaser 
                        // link={`https://docs.google.com/uc?export=download&id=1VbJL7jn2caPnMS9xAO4FkLVXtXFC49p5`} 
                        // link={`https://drive.google.com/file/d/1VbJL7jn2caPnMS9xAO4FkLVXtXFC49p5/view?usp=drive_link`}
                        link = {`${API_URL}/api/download/apk`}
                        source={"/assets/images/App_Teaser_1.jpg"}
                        download
                        video={false}
                    />
                </div>
        </div>
    );
}

export default HomeScreen;