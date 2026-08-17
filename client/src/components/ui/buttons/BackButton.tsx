import { useNavigate } from "react-router-dom";
import type { BackButtonProps } from "@/types/button.types";
import styles from "./backButton.module.css"

const BackButton = ({ navTo }: BackButtonProps) => {    
    const navigate = useNavigate();

    return (<>
        <button onClick={() => { navigate(navTo) }} className={styles.backButton} >
            <img src={"/assets/icons/back.png"} alt={"back"} className={styles.icon} />
        </button>
    </>);
}

export default BackButton;