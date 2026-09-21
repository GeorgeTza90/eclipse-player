import { useNavigate } from "react-router-dom";
import { NotLoggedInProps } from "@/types/ui.types";
import styles from "./notLoggedIn.module.css";

const NotLoggedIn = ({ text }: NotLoggedInProps) => {
    const navigate = useNavigate();

    return (
        <div className={styles.notLoggedIn}>
            <button className={styles.SignInButton} onClick={() => navigate("/")}>Sign In</button><br/>
            {text}
        </div>
    );
}

export default NotLoggedIn;