import { formatTime } from "@/utils/formatTime";
import styles from "./miniTimeSlider.module.css";
import { useAudio } from "@/contexts/AudioContextWeb";
import { TimeSliderProps } from "@/types/player.types";

const MiniTimeSlider = ({ width = 120, goRGB, position, duration, sliderPosition, RGBStyle, sliderStyle }: TimeSliderProps) => {
    const { seekTo } = useAudio();

    return (
        <div className={styles.sliderRow}>
            <span className={styles.time}>{formatTime(position * 1000)}</span>
            {goRGB && <div style={{...RGBStyle, width: `${width}rem`}} className={styles.sliderRGBStyle}></div>}
            <input
                type="range"
                min={0}
                max={duration || 0}
                step="0.1"
                value={sliderPosition ?? 0}
                onChange={(e) => seekTo(Number(e.target.value))}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                style={sliderStyle}
                className={styles.sliderStyle}
            />
            <span className={styles.time}>{formatTime(duration * 1000)}</span>
        </div>
    );
}

export default MiniTimeSlider;