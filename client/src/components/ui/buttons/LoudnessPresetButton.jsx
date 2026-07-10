import styles from "./loudnessPresetButton.module.css";

const LoudnessPresetButton = ({ heading, value, onChange, disabled = false }) => {
    const presets = [
        { id: "quiet", label: "Quiet" },
        { id: "normal", label: "Normal" },
        { id: "loud", label: "Loud" },
    ];

    const activePosition = {
        quiet: "0%",
        normal: "33.33%",
        loud: "66.66%",
    };

    return (
        <div className={styles.container}>
            <h4 className={disabled ? styles.text2 : styles.text1}>{heading}</h4>
            <div className={`${styles.extentionButton} ? ${styles.on} : ${styles.off}`}>
                <div className={disabled ? styles.extentionInActive : styles.extentionActive } style={{ left: activePosition[value] }}/>
                {presets.map((preset) => (
                    <button
                        key={preset.id}
                        disabled={disabled}
                        className={styles.extentionButtonsStyle}
                        onClick={() => onChange(preset.id)}
                    >
                        {preset.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LoudnessPresetButton;