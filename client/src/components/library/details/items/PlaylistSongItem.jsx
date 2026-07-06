import { groupArtistsByRole } from "../../../../utils/groupArtistsByRole";
import DeleteSongButton from "../../../ui/buttons/DeleteSongButton";
import styles from "./playlistSongItem.module.css";

const PlaylistSongItem = ({ item, index, playlistId, onPlay, onDelete }) => {
    const { mainArtists, featArtists } = groupArtistsByRole(item.artists);

    const mins = Math.floor(item.duration / 60);
    const secs = item.duration % 60;
    const duration = `${mins}:${("0" + secs).slice(-2)}`;

    return (
        <div className={styles.songRow}>
            <span className={styles.songIndex}>{index + 1}.</span>
            {item.image && (
                <img src={item.image} alt={item.title} className={styles.songImage} onClick={() => onPlay(item)} />
            )}

            <div className={styles.titleRow}>
                <span className={styles.songTitle} onClick={() => onPlay(item)}>{item.title}</span><br />
                <div className={styles.tickerContainer}>
                    {featArtists.length > 0 && (
                        <span className={styles.trackFeature}>
                            feat. {featArtists.join(", ")}
                        </span>
                    )}
                </div>
            </div>

            <span className={styles.text}> - </span>

            <div className={styles.tickerContainer} onClick={() => onPlay(item)}>
                <div className={styles.tickerText}>
                    {mainArtists.join(", ")}
                    {` - ${item.album}`}
                </div>
            </div>

            <DeleteSongButton
                playlistId={playlistId}
                songId={Number(item.id)}
                onDeleted={() => onDelete(Number(item.id))}
            />

            {typeof item.duration !== "undefined" && (
                <span className={styles.trackDuration}>{duration}</span>
            )}
        </div>
    );
};

export default PlaylistSongItem;