import type { GeneralButtonProps } from "@/types/button.types";
import styles from "./albumSwitchButton.module.css";

const AlbumSwitchButton = ({ groupsKind, type, onClick }: GeneralButtonProps) => {
    return(
        <button
            className={groupsKind === type ? styles.groupsKindButtonClicked : styles.groupsKindButton}
            onClick={onClick}
        >
            {type}
        </button>
    );    
}

export default AlbumSwitchButton;