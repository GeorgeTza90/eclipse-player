import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContextWeb";
import { usePostManager, usePutManager } from "../../../hooks/useCallManager";
import { useAutoClear } from "../../../hooks/useAutoClear";
import LoadingMessage from "../../ui/loaders/LoadingMessage";
import FormInput from "../../ui/inputs/FormInput";
import styles from "./userSettings.module.css";

const UserSettings = () => {
    const { call: postCall } = usePostManager();
    const { call: putCall } = usePutManager();
    const { user, setUser, authLoading } = useAuth();    

    const [username, setUsername] = useState("");
    const [localError, setLocalError] = useState(null);
    const [message, setMessage] = useState("...");

    /* --- AUTO-CLEAR  --- */
    useAutoClear(localError, setLocalError, 4000);
    useAutoClear("...", setMessage, 6000, "...");

    /* --- UPDATE USERNAME  --- */
    useEffect(() => {if (user?.username) setUsername(user?.username || "")}, [user]);

    /* --- LOADING  --- */
    if (authLoading) return <LoadingMessage message="Loading User Info ..." height="5vh"/>

    const updateUsername = async (username) => {
        if (!user) return;
        try {
            await putCall('updateUsername', username)
            setUser(prev => ({ ...prev, username }))
            setMessage("Username Updated")
        } catch (err) {
            setLocalError(err.message || "Failed to update username");
        }
    };
    
    const getPremium = () => setMessage("Premium service is not available yet");

    const handleForgotPassword = async (email) => {        
        if (!user) return;
        try {
            await postCall("forgotPassword", email);
            setMessage(`An email to reset Password has been sent to: ${email}`);
        } catch {
            setLocalError("Failed to send reset email. Try again later.");
        }
    };

    return (<>              
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
                    <button className={styles.updateButton} onClick={() => updateUsername(username)}>↺</button>                    
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
                
    </>);
}

export default UserSettings;