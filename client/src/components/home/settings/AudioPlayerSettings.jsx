import { useEffect } from "react";
import { useMiniPlayer } from "../../../contexts/MiniPlayerContextWeb";
import { useToast } from "../../../contexts/ToastContextWeb";
import { useIsMobile } from "../../../hooks/useIsMobile";
import ToggleButton from "../../ui/buttons/ToggleButton";
import styles from "./miniPlayerSettings.module.css";
import { useAudio } from "../../../contexts/AudioContextWeb";
import LoudnessPresetButton from "../../ui/buttons/LoudnessPresetButton";

const AudioPlayerSettings = () => {
    const {goRGB, setGoRGB, coloredGlow, setColoredGlow} = useMiniPlayer();
    const { normalization, setNormalization, loudnessPreset, setLoudnessPreset } =useAudio();
    const isMobile = useIsMobile();
    const { showToast } = useToast();

    useEffect(() => {
        if (!goRGB) return;
        showToast("RGB: ON? So you're that kind of ...", "info", 4000);
    }, [goRGB, showToast]);
    
    return (
        <div className={styles.container2}>                            
            <ToggleButton heading={"Colored"} isBarMode={false} value={coloredGlow} onChange={setColoredGlow} />                
            <ToggleButton heading={"Go Full RGB"} isBarMode={!coloredGlow} value={goRGB} onChange={setGoRGB} inActive={coloredGlow ? false : true}/>

            <ToggleButton heading={"Normilize Sound"} value={normalization} onChange={setNormalization} />                
            <LoudnessPresetButton heading={"Loudness Level"} value={loudnessPreset} onChange={setLoudnessPreset} disabled={!normalization}/>

        </div>        
    );
};

export default AudioPlayerSettings;