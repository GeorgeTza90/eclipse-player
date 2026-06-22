import styles from "./albumSwitchButton.module.css";

const AlbumSwitchButton = ({ groupsKind, type, onClick }) => {   
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