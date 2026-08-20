import type { GeneralButtonProps } from "@/types/ui.types";
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