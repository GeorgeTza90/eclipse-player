import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import { useAuth } from "@/contexts/AuthContextWeb.tsx";
import MiniPlayer from "@/components/player/mini/MiniPlayer";
import UserSettings from "./UserSettings";
import MiniPlayerSettings from "./MiniPlayerSettings";
import AudioPlayerSettings from "./AudioPlayerSettings";
import BackButton from "@/components/ui/buttons/BackButton";
import styles from "./settings.module.css";

const Settings = () => {   
    const { barMode } = useMiniPlayer();
    const { user } = useAuth();    

    return (
        <div className={styles.container}>
            {user && !barMode && (<MiniPlayer />)}
            <div className={styles.SettingsDiv}>
    {/* User Settings */}
                <h3>User Settings</h3>
                <UserSettings />
                <br/>

    {/* Audio Player Settings */}
                <h3>Audio Player Settings</h3>
                <AudioPlayerSettings />
                <br/>

    {/* Mini Player Settings */}
                <h3>Mini Player Settings</h3>
                <MiniPlayerSettings />

                <BackButton navTo={"/"}/>                
            </div>            
        </div>
    );
}

export default Settings;