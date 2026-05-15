import styles from "./addPlaylistButton.module.css"

const AddPlaylistButton = ({onClick}) => {
    return (<>
        <button className={styles.addButton} onClick={onClick}>+ Add Playlist</button>
    </>);
}

export default AddPlaylistButton;