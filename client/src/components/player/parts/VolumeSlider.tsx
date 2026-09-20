import { useAudio } from "@/contexts/AudioContextWeb";
import styles from "./volumeSlider.module.css"
import { VolumeSliderProps } from "@/types/player.types";

const VolumeSlider = ({ width = 50, volume, goRGB, RGBStyle, volumeSliderStyle }: VolumeSliderProps) => {
    const { setVolume } = useAudio();

    return(
        <div className={styles.sliderRowVol}>
            <button className={styles.VolButton} onClick={() => setVolume(0)}>
                <img className={volume === 0 ? styles.volIconActive : styles.volIcon} src="/assets/icons/volMin2.png" />
            </button>                    
            {goRGB && <div style={RGBStyle} className={styles.slidervolumeRGBStyle}></div>}
            <input
                type="range"
                min={0}
                max={1}
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                style={volumeSliderStyle}
                className={styles.volumeSliderStyle}
            />
            <button className={styles.VolButton} onClick={() => setVolume(1)}>
                <img className={volume === 1 ? styles.volIconActive : styles.volIcon} src="/assets/icons/volMax2.png" />
            </button>
        </div>
    );
}

export default VolumeSlider;