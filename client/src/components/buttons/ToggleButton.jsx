import styles from "./ToggleButton.module.css";

const ToggleButton = ({ value, onChange }) => {
    return (
        <div
            className={`${styles.toggle} ${value ? styles.on : styles.off}`}
            onClick={() => onChange(!value)}
        >
            <div className={styles.knob} />
        </div>
    );
};

export default ToggleButton;
