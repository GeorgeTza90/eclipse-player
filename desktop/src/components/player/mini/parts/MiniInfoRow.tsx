import ArtistButton from "@/components/ui/buttons/ArtistButton";
import styles from "./miniInfoRow.module.css";
import { InfoRowProps } from "@/types/player.types";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";

const MiniInfoRow = ({
    currentSong,
    featArtists,
    mainArtists,
    onClick,
}: InfoRowProps) => {
    const { barMode, showImage } = useMiniPlayer();

    return (
        <div className={styles.infoRow} style={{ marginLeft: barMode ? "-1rem" : showImage ? "-3.6rem" : "-1.8rem"}}>
            {currentSong?.image && showImage && (
                <img
                    src={currentSong.image}
                    alt={currentSong.title}
                    className={styles.image}
                    onClick={onClick}
                    onMouseDown={(e) => e.stopPropagation()}
                />
            )}

            <div className={styles.infoContent}>
        {/* Song title */}
                <div className={styles.tickerContainer}>
                    <h3 className={styles.titleTicker}>
                        {currentSong?.title || "Song Title"}
                    </h3>
                </div>

        {/* Featured artists */}
                {featArtists.length > 0 && (
                    <div className={styles.tickerContainer}>
                        <h3 className={styles.tickerText}>feat. {featArtists.join(", ")}</h3>
                    </div>
                )}

        {/* Main artists */}
                {mainArtists.length > 0 &&
                    mainArtists.map((artist, index) => (
                        <ArtistButton key={`${artist}-${index}`} artist={artist} size="0.8rem" marginTop="0rem" />
                    ))}
            </div>
        </div>
    );
};

export default MiniInfoRow;