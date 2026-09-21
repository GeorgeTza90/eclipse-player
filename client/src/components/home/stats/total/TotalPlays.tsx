import { TotalProps } from "@/types/stats.types";
import styles from "./totalListeningTime.module.css";

const TotalPlays = ({ total }: TotalProps ) => {
    return (
        <div className={styles.userInfo}>
            Total Plays:
            <p className={styles.statValue}>{total}</p>    
        </div>
    );
}

export default TotalPlays