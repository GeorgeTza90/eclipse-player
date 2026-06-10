import styles from "./albumSwitchButton.module.css";

const AlbumSwitchButton = ({ groupsKind, type, onClick }) => {
    console.log(groupsKind);

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