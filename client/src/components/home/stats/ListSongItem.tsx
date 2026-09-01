import { groupArtistsByRole } from "@/utils/groupArtistsByRole";
import { ListSongItemProps } from "@/types/stats.types";
import ErrorMessage from "@/components/ui/errors/ErrorMessage";
import styles from "./listSongItem.module.css"

const ListSongItem = ({song, onClick}: ListSongItemProps) => {
    if (!song) return(<ErrorMessage message="No Song Found" height={"5vh"} />)
    const { mainArtists, featArtists } = groupArtistsByRole(song.artists);

    return (
        <div key={song.id} className={styles.songItem} onClick={onClick}>
            <div className={styles.songRow}>
                {song.image && (
                    <img src={song.image} alt={song.title} className={styles.songImage} />
                )}

                <div className={styles.songText}>
                    <span className={styles.title}>{song.title}<br />
                        {featArtists.length > 0 && (
                            <span className={styles.trackFeature}>
                                feat. {featArtists.join(", ")}
                            </span>
                        )}
                    </span>
                    
                    <p className={styles.artist}>{mainArtists.join(", ")}</p>
                </div>
            </div>
        </div>
    )
}

export default ListSongItem;