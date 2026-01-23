import { Link } from "react-router-dom";
import styles from "./teaser.module.css";

export default function Teaser({ link, source }) {
    return (
        <Link to={link} className={styles.videoLink}>
            <video
                src={source}
                autoPlay
                loop
                muted
                playsInline
                className={styles.teaserVideo}
            />
        </Link>
    );
}