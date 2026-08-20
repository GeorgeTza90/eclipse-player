import { Link } from "react-router-dom";
import type { TeaserProps } from "@/types/ui.types";
import styles from "./teaser.module.css";

const Teaser = ({ link, source, download, video }: TeaserProps) => {
    const content = video ? (
        <video src={source} autoPlay loop muted playsInline className={styles.teaserVideo} />
    ) : (
        <img src={source} alt="teaser" className={styles.teaserVideo} />
    );

    if (download) {
        return (
            <a href={link} className={styles.videoLink} target="_blank" rel="noopener noreferrer" download>
                {content}
            </a>
        );
    }

    return (
        <Link to={link} className={styles.videoLink}>
            {content}
        </Link>
    );
}

export default Teaser;