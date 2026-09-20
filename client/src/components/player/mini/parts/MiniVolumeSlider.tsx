import { useAudio } from "@/contexts/AudioContextWeb";
import VolButton from "@/components/ui/buttons/VolButton";
import styles from "./miniVolumeSlider.module.css";
import { VolumeSliderProps } from "@/types/player.types";

const MiniVolumeSlider = ({ width = 120, goRGB, volume, RGBStyle, volumeSliderStyle }: VolumeSliderProps) => {
    const { setVolume } = useAudio();

    return(
        <div className={styles.sliderRowVol}>
            <VolButton type="Min" onClick={() => setVolume(0)} active={volume === 0 && true} />
            {goRGB && <div style={{...RGBStyle, width: `${width}rem`}} className={styles.sliderVolumeRGBStyle}></div>}
            <input
                type="range"
                min={0}
                max={1}
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                style={volumeSliderStyle}
                className={styles.volumeSliderStyle}
            />
            <VolButton type="Max" onClick={() => setVolume(1)} active={volume === 1 && true} />
        </div>
    );
}

export default MiniVolumeSlider;
