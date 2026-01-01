import AddToPlaylistButton from "../buttons/AddToPlaylistButton";
import styles from "./trackItem.module.css";

export default function TrackItem({ track, index, onPress, user }) {
    const minutes = Math.floor(track.duration / 60);
    const seconds = ("0" + (track.duration % 60)).slice(-2);

    return (
        <div key={track.id} onClick={() => onPress(track)} className={styles.track}>
            <div className={styles.trackLeft}>
                <span className={styles.trackNumber}>{index + 1}.</span>
                <div>
                    <span className={styles.trackTitle}>{track.title}</span><br />
                    {track.feature && (
                        <span className={styles.trackFeature}>{`(feat. ${track.feature})`}</span>
                    )}
                </div>

            </div>

            <div className={styles.trackRight}>
                {user && <AddToPlaylistButton song={track} />}
                {track.duration && (
                    <span className={styles.trackDuration}>
                        {minutes}:{seconds}
                    </span>
                )}
            </div>
        </div>
    );
}
