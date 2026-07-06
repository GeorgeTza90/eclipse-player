import { groupArtistsByRole } from "../../../../utils/groupArtistsByRole";
import AddToPlaylistButton from "../../../ui/buttons/AddToPlaylistButton";
import styles from "./trackItem.module.css";

const TrackItem = ({ track, index, onPress, user, isPrivate }) => {
    const minutes = Math.floor(track.duration / 60);
    const seconds = ("0" + (track.duration % 60)).slice(-2);    
    const { featArtists } = !isPrivate ? groupArtistsByRole(track.artists) : [];

    return (
        <div onClick={() => onPress(track)} className={styles.track}>
            <div className={styles.trackLeft}>
                <span className={styles.trackNumber}>{index + 1}.</span>
                <div>
                    <span className={styles.trackTitle}>{track.title}</span><br />
                        {(!isPrivate && featArtists.length > 0) && (
                            <span className={styles.trackFeature}>
                                feat. {featArtists.join(", ")}
                            </span>
                        )}
                </div>
            </div>

            <div className={styles.trackRight}>
                {(user && !isPrivate) && <AddToPlaylistButton song={track} />}
                {typeof track.duration !== "undefined" && (
                    <span className={styles.trackDuration}>{minutes}:{seconds}</span>
                )}
            </div>
        </div>
    );
}

export default TrackItem;