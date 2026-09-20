import { useAudio } from "@/contexts/AudioContextWeb";
import type { PlayButtonProps } from "@/types/ui.types";
import styles from "./playButton.module.css"

const icons = {
    play: "/assets/icons/playButton.png",
    pause: "/assets/icons/pauseButton.png",
    stop: "/assets/icons/stopButton.png",
    previous: "/assets/icons/prevButton.png",
    next: "/assets/icons/nextButton.png",
    shuffle: "assets/icons/shuffle.png",
    repeat: "assets/icons/repeat.png",
    "repeat-one": "assets/icons/repeatOne.png",
};

const PlayButton = ({ type = "play", onClick, size = "40px", active = false }: PlayButtonProps) => {
    const iconSrc = icons[type] || icons.play;
    const { currentSong } = useAudio();
    const buttonStyle = { width: size, height: size }

    const buttonClass = [
        currentSong ? styles.button : styles.buttonInactive,
        active ? styles.active : "",
    ].filter(Boolean).join(" ");

    return (
        <button onClick={onClick} className={buttonClass} style={buttonStyle}>
            <img src={iconSrc} alt={type} className={styles.icon} />
        </button>
    );
}

export default PlayButton;