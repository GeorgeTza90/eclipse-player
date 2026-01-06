import styles from "./playlistSongItem.module.css";
import DeleteSongButton from "../buttons/DeleteSongButton";

export const SongRow = ({ item, index = 0, playlistId, onPlay, onDelete }) => {
    return (
        <div className={styles.songRow}>
            {/* Index */}
            <span className={styles.songIndex}>{index + 1}.</span>

            {/* Image (clickable) */}
            {item.image && (
                <img
                    src={item.image}
                    alt={item.title}
                    className={styles.songImage}
                    onClick={() => onPlay(item)}
                />
            )}

            {/* Title (clickable) */}
            <div className={styles.titleRow}>
                <span className={styles.songTitle} onClick={() => onPlay(item)}>{item.title}</span><br />
                <div className={styles.tickerContainer}>
                    {item.feature && (
                        <span className={styles.trackfeature}>{`(feat. ${item.feature})`}</span>
                    )}
                </div>
            </div>

            <span className={styles.text}> - </span>

            {/* Artist/Album ticker */}
            <div className={styles.tickerContainer} onClick={() => onPlay(item)}>
                <div className={styles.tickerText}>
                    {`${item.artist} - ${item.album}`}
                </div>
            </div>

            {/* Delete button */}
            <DeleteSongButton
                playlistId={playlistId}
                songId={Number(item.id)}
                onDeleted={() => onDelete(item.id)}
            />

            {/* Duration */}
            {
                typeof item.duration !== "undefined" && (
                    <span className={styles.trackDuration}>
                        {Math.floor(item.duration / 60)}:
                        {("0" + (item.duration % 60)).slice(-2)}
                    </span>
                )
            }
        </div >
    );
};
