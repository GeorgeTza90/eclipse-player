import { formatDuration } from "@/utils/formatTime";
import styles from "./totalListeningTime.module.css";
import { TotalProps } from "@/types/stats.types";

const TotalListeningTime = ({ total }: TotalProps) => {
    return (
        <div className={styles.userInfo}>
            Total Listening Time:
            <p className={styles.statValue}>{formatDuration(total)}</p>
        </div>
    );
}

export default TotalListeningTime;