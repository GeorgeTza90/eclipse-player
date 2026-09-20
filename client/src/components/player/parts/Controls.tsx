import PlayButton from "@/components/ui/buttons/PlayButton";
import styles from "./controls.module.css";
import { useAudio } from "@/contexts/AudioContextWeb";

const Controls = () => {
    const { isPlaying, togglePlay, stop, next, previous } = useAudio();   
    const size = 40;

    return (
        <div className={styles.controls}>
            <PlayButton type="shuffle" onClick={() => {}} size={`${size*0.8}px`}/>
            <PlayButton type="previous" onClick={previous} size={`${size}px`}/>
            <PlayButton type="stop" onClick={stop} size={`${size*1.2}px`} />
            <PlayButton type={isPlaying ? "pause" : "play"} onClick={togglePlay} size={`${size*1.2}px`} />
            <PlayButton type="next" onClick={next} size={`${size}px`} />
            <PlayButton type="repeat" onClick={() => {}} size={`${size*0.8}px`} />
        </div>
    );
}

export default Controls;