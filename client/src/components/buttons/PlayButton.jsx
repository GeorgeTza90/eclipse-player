import { useAudio } from "../../contexts/AudioContextWeb";
import styles from "./playButton.module.css"

const icons = {
  play: "/assets/icons/playButton.png",
  pause: "/assets/icons/pauseButton.png",
  stop: "/assets/icons/stopButton.png",
  previous: "/assets/icons/prevButton.png",
  next: "/assets/icons/nextButton.png",
};

export default function PlayButton({ type = "play", onClick }) {
  const iconSrc = icons[type] || icons.play;
  const { currentSong } = useAudio();

  return (
    <button onClick={onClick} className={currentSong ? styles.button : styles.buttonInactive}>
      <img src={iconSrc} alt={type} className={styles.icon} />
    </button>
  );
}


