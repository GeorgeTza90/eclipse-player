import styles from "./googleButton.module.css";

const GoogleButton = ({ loading, isLogin, title, onClick, disabled, width = "100%" }) => {
    const buttonText = isLogin ? "Login with Google" : "Register with Google";

    return (
        <button
            type="button"
            onClick={onClick}
            className={styles.googleButton}
            disabled={disabled}
        >
            {buttonText}
        </button>
    );
}

export default GoogleButton;