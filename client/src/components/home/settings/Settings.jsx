import { useMiniPlayer } from "../../../contexts/MiniPlayerContextWeb";
import { useAuth } from "../../../contexts/AuthContextWeb";
import { useIsMobile } from '../../../hooks/useIsMobile';
import MiniPlayer from "../../player/mini/MiniPlayer";
import UserSettings from "./UserSettings";
import MiniPlayerSettings from "./MiniPlayerSettings";
import AudioPlayerSettings from "./AudioPlayerSettings";
import BackButton from "../../ui/buttons/BackButton";
import styles from "./settings.module.css";

const Settings = () => {   
    const { barMode } = useMiniPlayer();
    const { user } = useAuth();
    const isMobile = useIsMobile();

    return (
        <div className={styles.container}>
            {!isMobile && user && !barMode && (<MiniPlayer />)}
            <div>
    {/* User Settings */}
                <h3 className={styles.text3}>User Settings</h3>
                <UserSettings />
                <br/>

    {/* Audio Player Settings */}
                <h3 className={styles.text3}>Audio Player Settings</h3>
                <AudioPlayerSettings />
                <br/>

    {/* Mini Player Settings */}
                <h3 className={styles.text3}>Mini Player Settings</h3>
                <MiniPlayerSettings />
                {!isMobile && <><br/><br/></>}
    
                <BackButton navTo={"/"}/>
                {isMobile && <><br/><br/><br/></>}
            </div>            
        </div>
    );
}

export default Settings;