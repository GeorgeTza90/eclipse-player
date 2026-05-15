import DeletePlaylistButton from "../ui/buttons/DeletePlaylistButton";
import styles from "./playlistItem.module.css";

const PlaylistItem = ({ playlist, onDelete, onPress }) => {    
    return (
        <div
            className={styles.playlistItem}
            onClick={() => onPress(playlist)}
        >
            <div className={styles.titleRow}>
                <span className={styles.title}>{playlist.title}</span>
                <span className={styles.count}>{playlist.songCount ?? 0} songs</span>
            </div>
            <DeletePlaylistButton playlistId={playlist.id} onDeleted={onDelete} />
        </div>
    );
}

export default PlaylistItem;