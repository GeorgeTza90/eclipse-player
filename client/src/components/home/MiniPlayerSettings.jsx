import { useMiniPlayer } from "../../contexts/MiniPlayerContextWeb";
import ToggleButton from "../buttons/ToggleButton";
import styles from "./miniPlayerSettings.module.css";

const MiniPlayerSettings = () => {
    const {
        showImage, setShowImage,  showMiniPlayer, setShowMiniPlayer, showTimeBar, setShowTimeBar,
        showVolumeBar, setShowVolumeBar, transparency, setTransparency, showGlow, setShowGlow,
        barMode, setBarMode, coloredGlow, setColoredGlow, pos, setPos,
    } = useMiniPlayer();

    const posReset = () => {
        setPos({ x: window.innerWidth * 45 / 100, y: window.innerHeight * 74 / 100 });
    };

    return (
        <div className={styles.container}>
            <h4 className={styles.text1}>Show MiniPlayer</h4>
            <ToggleButton value={showMiniPlayer} onChange={setShowMiniPlayer} />

            <h4 className={!barMode ? styles.text1 : styles.text2}>Song's Image</h4>
            <ToggleButton value={showImage} onChange={setShowImage} inActive={!barMode ? false : true} />

            <h4 className={!barMode ? styles.text1 : styles.text2}>Time Bar</h4>
            <ToggleButton value={showTimeBar} onChange={setShowTimeBar} inActive={!barMode ? false : true} />

            <h4 className={styles.text1}>Bar Mode</h4>
            <ToggleButton value={barMode} onChange={setBarMode} />
            
            <h4 className={styles.text1}>Show Glow</h4>
            <ToggleButton value={showGlow} onChange={setShowGlow} />
            
            <h4 className={!barMode ? styles.text1 : styles.text2}>Volume Bar</h4>
            <ToggleButton value={showVolumeBar} onChange={setShowVolumeBar} inActive={!barMode ? false : true} />

            <h4 className={!barMode ? styles.text1 : styles.text2}>Transparent</h4>
            <ToggleButton value={transparency} onChange={setTransparency} inActive={!barMode ? false : true} />

            <h4 className={styles.text1}>Colored Glow</h4>
            <ToggleButton value={coloredGlow} onChange={setColoredGlow} />
            
            <h4 className={!barMode ? styles.text1 : styles.text2}>Reset Position</h4>
            <button onClick={posReset} className={!barMode ? styles.resetMPPosition : styles.resetMPPositionInActive} />
        </div>
    );
};

export default MiniPlayerSettings;
