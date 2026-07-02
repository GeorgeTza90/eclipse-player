import { useLibrary } from "../../../contexts/LibraryContextWeb";
import styles from "./libraryExtentionButton.module.css";

const LibraryExtentionButton = ({}) => {
    const { vinyl, setVinyl } = useLibrary();
    
    const handleExtention = (key) => setVinyl(key);
    const extentionHoverStyle = { left: `${vinyl === false ? 0 : vinyl === true ? 50 : 66}%` };    

    return(
        <div className={styles.extentionButton} style={{ position: "relative" }}>
            <div style={extentionHoverStyle} className={styles.extentionHoverStyle} />
            <button onClick={() => handleExtention(false)} className={styles.extentionButtonsStyle}>Card</button>
            <button onClick={() => handleExtention(true)} className={styles.extentionButtonsStyle}>Vinyl</button>
        </div>
    );
}

export default LibraryExtentionButton;