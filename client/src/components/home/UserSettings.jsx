import { useCallback, useEffect, useState } from "react";
import { useMiniPlayer } from "../../contexts/MiniPlayerContextWeb";
import { useAuth } from "../../contexts/AuthContextWeb";
import { useIsMobile } from '../../hooks/useIsMobile';
import { usePostManager } from "../../hooks/useCallManager";
import { useAutoClear } from "../../hooks/useAutoClear";
import MiniPlayer from "../player/MiniPlayer";
import LoadingMessage from "../ui/loaders/LoadingMessage";
import BackButton from "../ui/buttons/BackButton";
import MiniPlayerSettings from "./MiniPlayerSettings";
import styles from "./userSettings.module.css";
import FormInput from "../ui/inputs/FormInput";

const UserSettings = () => {
    const { loading: postLoading, error: postError, call: postCall } = usePostManager();
    const { user, setUser, loading } = useAuth();
    const isMobile = useIsMobile();
    const { barMode, setPlayerPage } = useMiniPlayer();
    const [username, setUsername] = useState("");
    const [localError, setLocalError] = useState(null);
    const [message, setMessage] = useState("...");

    /* --- AUTO-CLEAR  --- */
    useAutoClear(localError, setLocalError, 4000);
    useAutoClear("...", setMessage, 8000, "...");

    /* --- LOADING  --- */
    if (loading) return <LoadingMessage message="Loading User Info ..." height="5vh"/>            

    /* --- UPDATE USERNAME  --- */
    useEffect(() => {
        if (user?.username) setUsername(user?.username || "")
    }, [user]);    
    
    const updateUsername = async (username, id) => {        
        if (!user) return;
        try {
            await postCall('updateUsername', username, id)
            setUser(prev => ({ ...prev, username }))
            setMessage("Username Updated")
        } catch (err) {
            console.error(err);
        }
    };

    /* --- PREMIUM  --- */
    const getPremium = () => setMessage("Premium service is not available yet");

    /* --- RESET PASSWORD  --- */
    const handleForgotPassword = async (email) => {        
        if (!user) return;
        try {
            await postCall("forgotPassword", email);
            setMessage(`An email to reset Password has been sent to: ${email}`);
        } catch {
            setLocalError("Failed to send reset email. Try again later.");
        }
    };

    return (
        <div className={styles.container}>
            {!isMobile && user && !barMode && (<MiniPlayer />)}
            <div> 

    {/* User Settings */}                
                <h3 className={styles.text3}>User Settings</h3>
        {/* Username */}
                <div className={styles.userInfo}>
                    Username: 
                    <FormInput 
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        isForm={false}
                    />                    
                    <button className={styles.updateButton} onClick={() => updateUsername(username, user?.id)}>↺</button>                    
                </div>
                
        {/* Premium */}
                <div className={styles.userInfo}>
                    Premium User:
                    <p className={styles.premiumInfo}>{user?.premium ? (<>Yes</>) : (<>No</>)}</p>
                    {!user?.premium && <button className={styles.premiumButton} onClick={getPremium}>Get Premium</button>}
                </div> 

        {/* Email */}
                <div className={styles.userInfo}>
                    Email: 
                    <p className={styles.premiumInfo}>{user?.email}</p>                    
                </div>
                
                <button className={styles.switchButton} type="button" onClick={() => handleForgotPassword(user?.email)}>Change Password</button>

                <p className={styles.message}>{message}</p>              
                <br/><br/>

    {/* Mini Player Settings */}
                <h3 className={styles.text3}>Mini Player Settings</h3>
                    <MiniPlayerSettings />                                     
                <br/><br/>

                <BackButton navTo={"/"}/>
            </div>            
        </div>
    );
}

export default UserSettings;