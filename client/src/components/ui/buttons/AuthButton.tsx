import type { GeneralButtonProps } from "@/types/ui.types";
import styles from "./authButton.module.css";

const AuthButton = ({ loading, isLogin,title, onClick, width = "100%" }: GeneralButtonProps) => {
    const buttonText = title || (loading ? "Loading..." : isLogin ? "Login" : "Register");

    return (
        <button
            type="button"
            className={styles.authButton}
            onClick={onClick}       
            disabled={loading}
            style={{width: width}}
        >
            {buttonText}
        </button>
    );
}

export default AuthButton;