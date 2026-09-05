import { logger } from "@/utils/logger";
import type { MediaLinkProps } from "@/types/ui.types";
import styles from "./mediaLink.module.css";

const MediaLink = ({ platform, link }: MediaLinkProps) => {
    if (!link) return null;

    const iconClass = styles[platform];
    if (!iconClass) logger.warn("No icon defined for platform", { platform });

    return (
        <a
            href={link}
            className={`${styles.contactIcon} ${iconClass ?? ""}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform}
        />
    );
}

export default MediaLink;