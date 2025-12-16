import { useState } from "react";
import { useAudio } from "../../contexts/AudioContextWeb";
import styles from "./playlist.module.css"

export default function Playlist({ name = "Playlist" }) {
  const { library, currentSong, playSong } = useAudio();
  const [currentName, setCurrentName] = useState(name);

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{currentName}</h3>
      <div className={styles.list}>
        {library.map((item) => (
          <div
            key={item.id}
            className={`${styles.songItem} ${currentSong?.id === item.id ? styles.activeSongItem : ""}`}
            onClick={() => playSong(item, library)}
          >
            <div className={styles.songRow}>
              {item.image && (
                <img src={item.image} alt={item.title} className={styles.songImage} />
              )}
              <div className={styles.songText}>
                <p className={styles.title}>{item.title}</p>
                <p className={styles.artist}>{item.artist}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}