import { useState } from "react";
import styles from "./collectionCard.module.css"

export default function CollectionCard({ item, onClick, type }) {
    const [hover, setHover] = useState(false);

    const trackYearStyle = {
        display: hover ? "hidden" : "block",        
        color: hover ?  "#a0a0a000" : "#a0a0a0e0" ,
        fontSize: "0.72rem",
        margin: "2px 0",        
    };

    const artistNameStyle = {
        fontSize: hover ? "0.75rem" : "0.85rem",
        color: hover ?  "#a0a0a000" : "#a0a0a0e0" ,
    }

    const ImageStyle = {
        width: hover ? "9rem" : "7rem",
        margin: hover ? "-0.15rem" : "0rem",
        borderRadius: hover ? "0rem" : "1rem",
    }

    const TextStyle = {
        fontSize: hover ? "0.72rem" : "0.8rem",
        marginTop: hover ? "0.2rem" : "0.1rem"
    }

    return (
        <>
            {type === "song" && (
                <div className={styles.trackContainer} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    {item.image && (
                        <img src={encodeURI(item.image)} alt={item.album} className={styles.albumImage} style={ImageStyle} />
                    )}
                    <div className={styles.trackInfo}>
                        <p className={styles.trackTitle} style={TextStyle}>{item.album}</p>
                        <p className={styles.trackArtist}>{item.artist}</p>
                        <p className={styles.trackYear} style={trackYearStyle} > {hover ? "" : item.year}</p>
                    </div>
                </div>
            )}
            {type === "artist" && (
                <div className={styles.artistContainer} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    {item.image_url && (
                        <img src={encodeURI(item.image_url)} alt={item.album} className={styles.artistImage} style={ImageStyle} />
                    )}
                    <div className={styles.artistInfo}>
                        <p className={styles.trackTitle} style={artistNameStyle}>{item.name}</p>
                    </div>
                </div>
            )}
        </>);
}