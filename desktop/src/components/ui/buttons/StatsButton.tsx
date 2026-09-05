import type { GeneralButtonProps } from "@/types/ui.types";
import styles from "./authButton.module.css";

const StatsButton = ({ loading, onClick, width = "100%" }: GeneralButtonProps) => {
    return (
        <button className={styles.statsButton} onClick={onClick} disabled={loading} style={{width: width}}>            
            <img src="/assets/icons/stats.png" className={styles.icon}/>
        </button>
    );
}

export default StatsButton;