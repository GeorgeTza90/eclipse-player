import { useEffect, useState } from "react";
import { useAudio } from "../../../contexts/AudioContextWeb";
import PlaylistsongItem from "./PlaylistSongItem";
import styles from "./playlist.module.css"

const Playlist = ({ name = "Playlist" }) => {
    const { playlist, currentSong, playSong } = useAudio();
    const [currentName, setCurrentName] = useState(name);       

    useEffect(() => setCurrentName(name), [name])

    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>{currentName} - Playlist</h3>
            <div className={styles.list}>
                {playlist.map((item) => (
                    <span key={item.id}>
                        <PlaylistsongItem item={item} currentSong={currentSong} onClick={() => playSong(item, playlist)}/>
                    </span>
                ))}
            </div>
        </div>
    );
}

export default Playlist;