import styles from "./playlistItem.module.css";
import DeletePlaylistButton from "../buttons/DeletePlaylistButton";

export default function PlaylistItem({ playlist, token, onDelete, onPress }) {
    return (
        <div
            className={styles.playlistItem}
            onClick={() => onPress(playlist)}
        >
            <span className={styles.title}>{playlist.title}</span>
            <span className={styles.text}> - </span>
            <span className={styles.count}>{playlist.songCount ?? 0} songs</span>
            <DeletePlaylistButton playlistId={playlist.id} onDeleted={onDelete} />
        </div>
    );
}
