import type { GeneralButtonProps } from "@/types/button.types";
import styles from "./googleButton.module.css";

const GoogleButton = ({ loading, isLogin, title, onClick, disabled }: GeneralButtonProps) => {
    const buttonText = title || (loading ? "Loading..." : isLogin ? "Login with Google" : "Register with Google");

    return (
        <button
            type="button"
            className={styles.googleButton}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {buttonText}
        </button>
    );
}

export default GoogleButton;