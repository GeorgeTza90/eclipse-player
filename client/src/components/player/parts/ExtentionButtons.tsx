import { ExtentionButtonsProps } from "@/types/player.types";
import styles from "./extentionButtons.module.css";

const ExtentionButtons = ({ extentionHoverStyle, onPlaylist, onLyrics, onEqualizer }: ExtentionButtonsProps) => {

    return (
        <div className={styles.extentionButton} style={{ position: "relative" }}>        
            <div style={extentionHoverStyle} className={styles.extentionHoverStyle}/>            
            <button onClick={onPlaylist} className={styles.extentionButtonsStyle}>Playlist</button>
            <button onClick={onLyrics} className={styles.extentionButtonsStyle}>Lyrics</button>
            <button onClick={onEqualizer} className={styles.extentionButtonsStyle}>Equalizer</button>
        </div>
    );
}

export default ExtentionButtons;