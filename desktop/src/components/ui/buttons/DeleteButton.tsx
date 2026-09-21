import styles from "./deleteButton.module.css";
import type { DeleteButtonProps } from "@/types/ui.types";

const DeleteButton = ({ onClick, disabled }: DeleteButtonProps) => {
    return (
        <button className={styles.presetDelete} onClick={onClick} disabled={disabled}>X</button>
    );
};

export default DeleteButton;