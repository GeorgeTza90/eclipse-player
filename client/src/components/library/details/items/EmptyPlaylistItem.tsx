import { useNavigate } from "react-router-dom";
import styles from "./emptyPlaylistItem.module.css";

const EmptyPlaylistItem = ({ message = "No songs in this playlist yet.", navigateTo = "/library", buttonMessage = "Add Music" }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.centered}>
            <p className={styles.noSongs}>{message}</p>
            <button className={styles.addMusicButton} onClick={() => navigate(navigateTo)}>{buttonMessage}</button>
        </div>
    );
};

export default EmptyPlaylistItem;