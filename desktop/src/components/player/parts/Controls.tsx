import PlayButton from "@/components/ui/buttons/PlayButton";
import styles from "./controls.module.css";
import { useAudio } from "@/contexts/AudioContextWeb";

const Controls = () => {
    const { isPlaying, togglePlay, stop, next, previous, shuffle, repeatMode, toggleShuffle, cycleRepeatMode } = useAudio();
    const size = 40;

    return (
        <div className={styles.controls}>
            <PlayButton type="shuffle" onClick={toggleShuffle} size={`${size*0.8}px`} active={shuffle} />
            <PlayButton type="previous" onClick={previous} size={`${size}px`}/>
            <PlayButton type="stop" onClick={stop} size={`${size*1.2}px`} />
            <PlayButton type={isPlaying ? "pause" : "play"} onClick={togglePlay} size={`${size*1.2}px`} />
            <PlayButton type="next" onClick={next} size={`${size}px`} />
            <PlayButton type={repeatMode === "one" ? "repeat-one" : "repeat"} onClick={cycleRepeatMode} size={`${size*0.8}px`} active={repeatMode !== "off"} />
        </div>
    );
}

export default Controls;