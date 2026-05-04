import styles from "./authButton.module.css";

const SettingsButton = ({ loading, isLogin, title, onClick, width = "100%" }) => {
    const buttonText = title || (loading ? "Loading..." : isLogin ? "Login" : "Register");

    return (
        <button className={styles.settingsButton} onClick={onClick} disabled={loading} style={{width: width}}>
            {/* {buttonText} */}
            <img src="/assets/icons/settings.png" className={styles.icon}/>
        </button>
    );
}

export default SettingsButton;