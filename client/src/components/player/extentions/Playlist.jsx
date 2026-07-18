import { useEffect, useState } from "react";
import { useAudio } from "../../../contexts/AudioContextWeb";
import PlaylistsongItem from "./PlaylistSongItem";
import styles from "./playlist.module.css"
import { useNavigate } from "react-router-dom";

const Playlist = ({ name = "Playlist" }) => {
    const { playlist, currentSong, playSong } = useAudio("No Gods In Heaven");
    const [currentName, setCurrentName] = useState(name);
    const navigate = useNavigate();

    useEffect(() => setCurrentName(name), [name]);

    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>{currentName} - Playlist</h3>
            <div className={styles.list}>                
                {playlist && playlist.map((item) => (
                    <span key={item.id}>
                        <PlaylistsongItem item={item} currentSong={currentSong} onClick={() => playSong(item, playlist)}/>
                    </span>
                ))}
            </div>
            {!currentSong &&
                <div className={styles.notLoggedIn}>
                    <button className={styles.SignInButton} onClick={() => navigate("/")}>Sign In</button><br/>
                        to create your playlist
                </div>}
        </div>
    );
}

export default Playlist;