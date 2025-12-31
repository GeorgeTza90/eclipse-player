import styles from "./volButton.module.css"
export default function VolButton({ type, onClick, active }) {

    return (<>
        <button className={styles.VolButton} onClick={onClick}>
            <img className={active ? styles.volIconActive : styles.volIcon} src={`/assets/icons/vol${type}2.png`} />
        </button>
    </>);
}