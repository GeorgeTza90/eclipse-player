import styles from "./authButton.module.css";

const SettingsButton = ({ loading, isLogin, title, onClick, width = "100%" }) => {    

    return (
        <button className={styles.settingsButton} onClick={onClick} disabled={loading} style={{width: width}}>            
            <img src="/assets/icons/settings.png" className={styles.icon}/>
        </button>
    );
}

export default SettingsButton;