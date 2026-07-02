import { groupArtistsByRole } from "../../../utils/groupArtistsByRole";
import styles from "./playlistSongItem.module.css"

const PlaylistsongItem = ({item, currentSong, onClick}) => {
    const { mainArtists, featArtists } = groupArtistsByRole(item.artists);    

    return (
        <div
            key={item.id}
            className={`${styles.songItem} ${currentSong?.id === item.id ? styles.activeSongItem : ""}`}
            onClick={onClick}
        >
            <div className={styles.songRow}>
                {item.image && (
                    <img src={item.image} alt={item.title} className={styles.songImage} />
                )}
                <div className={styles.songText}>
                    <span className={styles.title}>{item.title}<br />
                        {featArtists.length > 0 && (
                            <span className={styles.trackFeature}>
                                feat. {featArtists.join(", ")}
                            </span>
                        )}
                    </span>
                    <p className={styles.artist}>
                        {mainArtists.join(", ")}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PlaylistsongItem;