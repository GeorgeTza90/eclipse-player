import { Link } from "react-router-dom";
import styles from "./teaser.module.css";

export default function Teaser({ link, source, download, video }) {    
    return (
        <a
            href={link}
            className={styles.videoLink}
            target={download ? "_blank" : undefined}
            rel={download ? "noopener noreferrer" : undefined}
            download={download ? true : undefined}
        >
            {video ? (
                <video
                    src={source}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.teaserVideo}
                />
            ) : (
                <img src={source} alt="teaser" className={styles.teaserVideo}/>
            )}
        </a>
    );
}

