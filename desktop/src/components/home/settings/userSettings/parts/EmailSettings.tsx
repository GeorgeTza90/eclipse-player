import { EmailSettingsProps } from "@/types/auth.types";
import styles from "./emailSettings.module.css";

const EmailSettings = ({ user, onClick }: EmailSettingsProps) => {
    return (<>
        <div className={styles.userInfo}>
            Email: 
            <p className={styles.premiumInfo}>{user?.email}</p>                    
        </div>                
        <button className={styles.switchButton} type="button" onClick={onClick}>Change Password</button>        
    </>);
}

export default EmailSettings;