import { PremiumSettingsProps } from "@/types/auth.types";
import styles from "./premiumSettings.module.css";

const PremiumSettings = ({ user, onClick }: PremiumSettingsProps) => {
    return (
        <div className={styles.userInfo}>
            Premium User:
            <p className={styles.premiumInfo}>{user?.premium ? (<>Yes</>) : (<>No</>)}</p>
            {!user?.premium && <button className={styles.premiumButton} onClick={onClick}>Get Premium</button>}
        </div> 
    );
}

export default PremiumSettings;