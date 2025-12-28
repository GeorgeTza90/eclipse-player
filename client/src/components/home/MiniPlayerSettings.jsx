import ToggleButton from "../buttons/ToggleButton";
import styles from "./miniPlayerSettings.module.css";
import { useMiniPlayer } from "../../contexts/MiniPlayerContextWeb";

const MiniPlayerSettings = () => {

    const {
        showImage, setShowImage,
        showMiniPlayer, setShowMiniPlayer,
        showTimeBar, setShowTimeBar,
        showVolumeBar, setShowVolumeBar,
        transparency, setTransparency,
        showGlow, setShowGlow,
        setPos, pos
    } = useMiniPlayer();

    const posReset = () => {
        setPos({ x: window.innerWidth * 70 / 100, y: window.innerHeight * 45 / 100 });
    };

    return (
        <div className={styles.container}>

            <h4 className={styles.text1}>Show MiniPlayer</h4>
            <ToggleButton value={showMiniPlayer} onChange={setShowMiniPlayer} />

            <h4 className={styles.text1}>Song's Image</h4>
            <ToggleButton value={showImage} onChange={setShowImage} />

            <h4 className={styles.text1}>Time Bar</h4>
            <ToggleButton value={showTimeBar} onChange={setShowTimeBar} />

            <h4 className={styles.text1}>Volume Bar</h4>
            <ToggleButton value={showVolumeBar} onChange={setShowVolumeBar} />

            <h4 className={styles.text1}>Transparent</h4>
            <ToggleButton value={transparency} onChange={setTransparency} />

            <h4 className={styles.text1}>Show Glow</h4>
            <ToggleButton value={showGlow} onChange={setShowGlow} />

            <h4 className={styles.text1}>Reset Position</h4>
            <button onClick={posReset} className={styles.resetMPPosition} />
        </div>
    );
};

export default MiniPlayerSettings;
