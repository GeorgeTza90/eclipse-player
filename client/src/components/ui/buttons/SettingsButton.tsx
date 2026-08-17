import type { GeneralButtonProps } from "@/types/button.types";
import styles from "./authButton.module.css";

const SettingsButton = ({ loading, onClick, width = "100%" }: GeneralButtonProps) => {
    return (
        <button className={styles.settingsButton} onClick={onClick} disabled={loading} style={{width: width}}>            
            <img src="/assets/icons/settings.png" className={styles.icon}/>
        </button>
    );
}

export default SettingsButton;