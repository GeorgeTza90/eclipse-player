import { useIsMobile } from "@/hooks/useIsMobile";
import styles from "./linedBackground.module.css";

const LinedBackground = () => {
    const isMobile = useIsMobile();

    return (
        <div className={styles.linesDiv}>
            {Array(isMobile ? 10 : 16).fill(0).map((_, i) => (
                <hr key={i} className={styles.line} />
            ))}
        </div>
    );
}

export default LinedBackground;