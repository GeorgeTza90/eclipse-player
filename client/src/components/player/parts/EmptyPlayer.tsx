import { useNavigate } from "react-router-dom";
import styles from "./emptyPlayer.module.css";

const EmptyPlayer = () => {
    const navigate = useNavigate();

    return(
        <div className={styles.emptyRow}>
            <p className={styles.emptyPlayer}>Player Is Empty</p>
            <p className={styles.songsAdd} onClick={() => navigate(`/library`)}>Add Songs Here</p>
        </div>
    );
}

export default EmptyPlayer;