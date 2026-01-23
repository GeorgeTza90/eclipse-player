import styles from "./addPlaylistButton.module.css"

export default function AddPlaylistButton({onClick}) {

    return (<>
        <button
            className={styles.addButton}
            onClick={onClick}
        >
            + Add Playlist
        </button>
    </>);
}