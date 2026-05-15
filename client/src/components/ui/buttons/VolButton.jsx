import styles from "./volButton.module.css"

const VolButton = ({ type, onClick, active }) => {
    return (<>
        <button className={styles.VolButton} onClick={onClick}>
            <img className={active ? styles.volIconActive : styles.volIcon} src={`/assets/icons/vol${type}2.png`} />
        </button>
    </>);
}

export default VolButton;