import { useNavigate } from "react-router-dom";
import styles from "./backButton.module.css"

export default function BackButton({ navTo }) {
    const navigate = useNavigate();

    return (<>
        <button
            onClick={() => { navigate(navTo) }}
            className={styles.backButton}
        >
            <img src={"/assets/icons/back.png"} alt={"back"} className={styles.icon} />
        </button>
    </>);
}