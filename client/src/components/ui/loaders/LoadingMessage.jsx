import { useEffect, useState } from "react";
import styles from "./loadingMessage.module.css";

const LoadingMessage = ({ message = "Loading Collection ...", height = "50vh" }) => {
    const [visible, setVisible] = useState(true);

    const styleDiv = { height: height }

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(prev => !prev);
        }, 200);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.loadingContainer} style={styleDiv}>
            <div className="spinner" />
            <p style={{ opacity: visible ? 1 : 0, marginTop: 5 }}>
                {message}
            </p>
        </div>
    );
}

export default LoadingMessage;