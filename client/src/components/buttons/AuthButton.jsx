import styles from "./authButton.module.css";

const AuthButton = ({ loading, isLogin, title, onClick, width = "100%" }) => {
    const buttonText = title || (loading ? "Loading..." : isLogin ? "Login" : "Register");

    return (
        <button className={styles.authButton} onClick={onClick} disabled={loading} style={{width: width}}>
            {buttonText}
        </button>
    );
}

export default AuthButton;