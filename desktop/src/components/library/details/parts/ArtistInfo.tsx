import MediaLink from "@/components/ui/links/MediaLink";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ArtistInfoProps } from "@/types/library.types";
import styles from "./artistInfo.module.css";

const ArtistInfo = ({artist}: ArtistInfoProps) => {
    const isMobile = useIsMobile();
    return(
        <div className={styles.header}>
            {(artist.image_url && !isMobile) && (
                <img src={artist.image_url} alt={artist.name} className={styles.Image} />
            )}
            <div className={styles.headerInfo}>
                <p className={styles.artistName}>{artist.name}</p>
                <p className={styles.artistInfo}>{artist.description}</p>
                <div className={styles.contactInfo}>
                    {Object.entries(artist.media ?? {}).map(([platform, link]) => (
                        <MediaLink key={platform} platform={platform} link={link} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ArtistInfo;