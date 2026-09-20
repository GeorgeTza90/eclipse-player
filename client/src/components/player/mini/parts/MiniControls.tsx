import { useAudio } from "@/contexts/AudioContextWeb";
import { MiniControlsProps } from "@/types/player.types";
import PlayButton from "@/components/ui/buttons/PlayButton";
import styles from "./miniControls.module.css";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";

const MiniControls = ({ size, isPlaying }: MiniControlsProps) => {
    const { previous, stop, togglePlay, next } = useAudio();
    const { barMode } = useMiniPlayer();

    return (
        <div className={barMode ? styles.controlsBar : styles.controls}>
            <PlayButton type="shuffle" onClick={() => {}} size={`${size*0.8}px`}/>
            <PlayButton type="previous" onClick={previous} size={`${size}px`}/>
            <PlayButton type="stop" onClick={stop} size={`${size*1.2}px`} />
            <PlayButton type={isPlaying ? "pause" : "play"} onClick={togglePlay} size={`${size*1.2}px`} />
            <PlayButton type="next" onClick={next} size={`${size}px`} />
            <PlayButton type="repeat" onClick={() => {}} size={`${size*0.8}px`} />
        </div>
    );
}

export default MiniControls;