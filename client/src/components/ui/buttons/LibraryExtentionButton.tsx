import { useLibrary } from "@/contexts/LibraryContextWeb";
import styles from "./libraryExtentionButton.module.css";

const LibraryExtentionButton = () => {
    const { vinyl, setVinyl } = useLibrary();
    
    const handleExtention = (key: boolean) => setVinyl(key);
    const extentionHoverStyle = { left: `${vinyl ? 50 : 0}%` };

    return(
        <div className={styles.extentionButton} style={{ position: "relative" }}>
            <div style={extentionHoverStyle} className={styles.extentionHoverStyle} />
            <button onClick={() => handleExtention(false)} className={styles.extentionButtonsStyle}>Card</button>
            <button onClick={() => handleExtention(true)} className={styles.extentionButtonsStyle}>Vinyl</button>
        </div>
    );
}

export default LibraryExtentionButton;