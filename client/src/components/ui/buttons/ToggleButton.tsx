import type { ToggleButtonProps } from "@/types/ui.types";
import styles from "./ToggleButton.module.css";

const ToggleButton = ({ 
    heading,
    isBarMode,
    value,
    onChange,
    inActive
}: ToggleButtonProps) => {
    return (<>
        <h4 className={isBarMode ? styles.text2 : styles.text1}>{heading}</h4>
        <div
            className={`${inActive ? styles.toggleInActive : styles.toggle} ${inActive ? styles.off : (value ? styles.on : styles.off)}`}
            onClick={() => !inActive && onChange(!value)}
        >
            <div className={styles.knob} />
        </div>
    </>);
};

export default ToggleButton;