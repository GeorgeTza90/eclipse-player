import { PresetButtonProps } from "@/types/ui.types";
import styles from "./presetButton.module.css";

const PresetButton = ({type, showPresetList = false, onClick}: PresetButtonProps) => {
    return(
        <button 
            className={
                type === "Load" 
                    ? showPresetList ? styles.presetButtonActive : styles.presetButton
                    : styles.presetButton
            }
            onClick={onClick}
        >
            {type}
        </button>
    );
}

export default PresetButton;