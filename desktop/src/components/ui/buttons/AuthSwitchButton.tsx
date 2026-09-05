import type { GeneralButtonProps } from "@/types/ui.types";
import styles from "./authSwitchButton.module.css"

const AuthSwitchButton = ({message, onClick, disabled}: GeneralButtonProps) => {
    return(
        <div className={styles.switchWrapper}>
            <button
                type="button"
                className={styles.switchButton}
                onClick={onClick}
                disabled={disabled}
            >
                {message}
            </button>
        </div>
    );
}

export default AuthSwitchButton;