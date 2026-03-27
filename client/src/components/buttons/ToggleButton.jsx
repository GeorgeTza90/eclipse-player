import styles from "./ToggleButton.module.css";

const ToggleButton = ({ value, onChange, inActive }) => {
    return (
        <div
            className={`${inActive ? styles.toggleInActive : styles.toggle} ${inActive ? styles.off : (value ? styles.on : styles.off)}`}
            onClick={() => !inActive && onChange(!value)}
        >
            <div className={styles.knob} />
        </div>
    );
};

export default ToggleButton;
