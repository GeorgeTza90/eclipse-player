import styles from "./collectionCard.module.css"

export default function CollectionCard({ item, onClick, type }) {
    return (
        <>
            {type === "song" && (
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
            )}
            {type === "artist" && (
                <div className={styles.artistContainer} onClick={onClick}>
                    {item.image_url && (
                        <img
                            src={encodeURI(item.image_url)}
                            alt={item.album}
                            className={styles.artistImage}
                        />
                    )}
                    <div className={styles.artistInfo}>
                        <p className={styles.trackTitle}>{item.name}</p>
                    </div>
                </div>
            )}
        </>);
}