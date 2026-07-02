import { useEffect } from "react";
import { useMiniPlayer } from "../../../contexts/MiniPlayerContextWeb";
import { useToast } from "../../../contexts/ToastContextWeb";
import { useIsMobile } from "../../../hooks/useIsMobile";
import ToggleButton from "../../ui/buttons/ToggleButton";
import styles from "./miniPlayerSettings.module.css";

const MiniPlayerSettings = () => {
    const {
        showImage, setShowImage,  showMiniPlayer, setShowMiniPlayer, showTimeBar, setShowTimeBar,
        showVolumeBar, setShowVolumeBar, transparency, setTransparency, showGlow, setShowGlow,
        barMode, setBarMode, coloredGlow, setColoredGlow, setPos,goRGB, setGoRGB,
    } = useMiniPlayer();
    const isMobile = useIsMobile();
    const { showToast } = useToast();
    const posReset = () => setPos({ x: window.innerWidth * 45 / 100, y: window.innerHeight * 74 / 100 });   

    useEffect(() => {
        if (!goRGB) return;
        showToast("RGB: ON? So you're that kind of ...", "info", 4000);
    }, [goRGB, showToast]);
    
    return (<>
        {isMobile && (<>
            <p className={styles.notAvailable}>Mini Player is not available in Mobile View</p>
            <div className={styles.container}>
                <ToggleButton heading={"Colored"} isBarMode={false} value={coloredGlow} onChange={setColoredGlow} />                
                <ToggleButton heading={"Go Full RGB"} isBarMode={false} value={goRGB} onChange={setGoRGB} inActive={coloredGlow ? false : true}/>
            </div>
        </>)}
        {!isMobile && (
            <div className={styles.container}>                
                <ToggleButton heading={"Show MiniPlayer"} isBarMode={false} value={showMiniPlayer} onChange={setShowMiniPlayer} />                
                <ToggleButton heading={"Song's Image"} isBarMode={barMode} value={showImage} onChange={setShowImage} inActive={!barMode ? false : true} />                
                <ToggleButton heading={"Time Bar"} isBarMode={barMode} value={showTimeBar} onChange={setShowTimeBar} inActive={!barMode ? false : true} />                
                <ToggleButton heading={"Bar Mode"} isBarMode={false} value={barMode} onChange={setBarMode} />                                
                <ToggleButton heading={"Show Glow"} isBarMode={false} value={showGlow} onChange={setShowGlow} />                                
                <ToggleButton heading={"Volume Bar"} isBarMode={barMode} value={showVolumeBar} onChange={setShowVolumeBar} inActive={!barMode ? false : true} />                
                <ToggleButton heading={"Transparent"} isBarMode={barMode} value={transparency} onChange={setTransparency} inActive={!barMode ? false : true} />                
                <ToggleButton heading={"Colored"} isBarMode={false} value={coloredGlow} onChange={setColoredGlow} />                
                <ToggleButton heading={"Go Full RGB"} isBarMode={!coloredGlow} value={goRGB} onChange={setGoRGB} inActive={coloredGlow ? false : true}/>
                                
                <h4 className={!barMode ? styles.text1 : styles.text2}>Reset Position</h4>
                <button onClick={posReset} className={!barMode ? styles.resetMPPosition : styles.resetMPPositionInActive} />
            </div>      
        )}                 
    </>);
};

export default MiniPlayerSettings;