import styles from "./updateButton.module.css";
import type { UpdateButtonProps } from "@/types/ui.types";

const UpdateButton = ({ onClick }: UpdateButtonProps) => {
    return (
        <button className={styles.presetUpdate} onClick={onClick}>↺</button>
    );
};

export default UpdateButton;