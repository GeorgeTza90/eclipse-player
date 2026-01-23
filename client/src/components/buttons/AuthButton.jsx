import styles from "./authButton.module.css";

export default function AuthButton({ loading, isLogin, title, onClick, width = "100%" }) {
    const buttonText = title || (loading ? "Loading..." : isLogin ? "Login" : "Register");

    return (
        <button className={styles.authButton} onClick={onClick} disabled={loading} style={{width: width}}>
            {buttonText}
        </button>
    );
}
