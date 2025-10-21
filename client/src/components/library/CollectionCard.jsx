import styles from "./collectionCard.module.css"

export default function CollectionCard({ item, onClick }) {
    return (
        <div className={styles.trackContainer} onClick={onClick}>
            {item.image && (
                <img
                    src={encodeURI(item.image)}
                    alt={item.album}
                    className={styles.albumImage}
                />
            )}
            <div className={styles.trackInfo}>
                <p className={styles.trackTitle}>{item.album}</p>
                <p className={styles.trackArtist}>{item.artist}</p>
                <p className={styles.trackAlbum}>{item.year}</p>
            </div>
        </div>
    );
}