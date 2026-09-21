import PresetButton from "@/components/ui/buttons/PresetButton";
import { PresetsButtonsProps } from "@/types/player.types";
import styles from "./presetsButtons.module.css";

const PresetsButtons = ({ showPresetList, onReset, onSave, onLoad }: PresetsButtonsProps) => {
    return(
        <div className={styles.buttons}>
            <PresetButton type="Reset" onClick={onReset}/>
            <PresetButton type="Save" onClick={onSave}/>
            <PresetButton type="Load" showPresetList={showPresetList} onClick={onLoad}/>
        </div>
    );
}

export default PresetsButtons;