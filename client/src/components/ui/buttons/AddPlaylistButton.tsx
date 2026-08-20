import type { GeneralButtonProps } from "@/types/ui.types";
import styles from "./addPlaylistButton.module.css"

const AddPlaylistButton = ({onClick}: GeneralButtonProps) => {
    return (<>
        <button className={styles.addButton} onClick={onClick}>+ Add Playlist</button>
    </>);
}

export default AddPlaylistButton;