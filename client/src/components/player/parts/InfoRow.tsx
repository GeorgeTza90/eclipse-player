import ArtistButton from "@/components/ui/buttons/ArtistButton";
import { InfoRowProps } from "@/types/player.types";
import styles from "./infoRow.module.css"

const InfoRow = ({currentSong, featArtists, mainArtists, onClick}: InfoRowProps) => {

    return(
        <div className={styles.infoRow}>
            {currentSong?.image && <img src={currentSong.image} alt={currentSong.title} className={styles.image} onClick={onClick} />}
            <div>
                <h3 className={styles.title}>{currentSong?.title || "Song Title"}</h3>
                {featArtists.length > 0 && (
                    <span className={styles.trackFeature}>
                        feat. {featArtists.join(", ")}
                    </span>
                )}
                <p className={styles.artist}>
                    {mainArtists.map((artist, index) => (
                        <span key={artist}>
                            <ArtistButton artist={artist || "Artist Name"} size="0.9rem" />                                    
                        </span>
                    ))} 
                </p>
            </div>
        </div>
    );
}

export default InfoRow;