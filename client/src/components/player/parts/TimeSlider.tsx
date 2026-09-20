import { formatTime } from "@/utils/formatTime";
import styles from "./timeSlider.module.css";
import { TimeSliderProps } from "@/types/player.types";
import { useAudio } from "@/contexts/AudioContextWeb";

const TimeSlider = ({position, goRGB, RGBStyle, duration, sliderPosition, sliderStyle }: TimeSliderProps) => {
    const { seekTo } = useAudio();

    return(
        <div className={styles.sliderRow}>
            <span className={styles.time}>{formatTime(position * 1000)}</span>
            {goRGB && <div style={RGBStyle} className={styles.sliderRGBStyle}></div>}
            <input
                type="range"
                min={0}
                max={duration || 0}
                step="0.1"
                value={sliderPosition ?? 0}
                onChange={(e) => seekTo(Number(e.target.value))}
                style={sliderStyle}
                className={styles.sliderStyle}
            />                    
            <span className={styles.time}>{formatTime(duration * 1000)}</span>                    
        </div>
    );
}

export default TimeSlider;