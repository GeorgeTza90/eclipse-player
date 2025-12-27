import { Link } from "react-router-dom";
import styles from "./teaser.module.css";

export default function Teaser({ link }) {
    return (
        <Link to={link} className={styles.videoLink}>
            <video
                src="/assets/vids/Video Teaser 2.mp4"
                autoPlay
                loop
                muted
                playsInline
                className={styles.teaserVideo}
            />
        </Link>
    );
}