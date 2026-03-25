import { useState } from "react";
import { useAudio } from "../../contexts/AudioContextWeb";
import { useLibrary } from "../../contexts/LibraryContextWeb";
import { useIsMobile } from "../../hooks/useIsMobile";
import PlayButton from "../buttons/PlayButton";
import styles from "./collectionCard.module.css"

export default function CollectionCard({ item, onClick, type }) {
    const { playSong, currentSong, isPlaying, togglePlay, stop } = useAudio();    
    const [ hover, setHover ] = useState(false);
    const { songs } = useLibrary();
    const isMobile = useIsMobile();

    const handlePlayClick = (item) => {
        const albumSongs = songs.filter(s => s.album === item.album);
        if (currentSong?.album === item.album) { togglePlay(); return; }
        if (isPlaying) stop();
        playSong(albumSongs[0], albumSongs, item.album);
    };  

    const trackYearStyle = { display: hover ? "hidden" : "block", color: hover ?  "#a0a0a000" : "#a0a0a0e0", fontSize: "0.72rem", margin: "2px 0" };
    const artistNameStyle = { fontSize: hover ? "0.75rem" : "0.85rem", color: hover ?  "#a0a0a000" : "#a0a0a0e0" }
    const AlbumImageStyle = { width: isMobile ? "6rem" : (hover ? "8.7rem" : "7rem"), margin: hover ? "-0.15rem" : "0rem", borderRadius: hover ? "0rem" : "0.4rem" }
    const ArtistImageStyle = { width: isMobile ? "6rem" : (hover ? "9rem" : "7rem"), margin: hover ? "-0.15rem" : "0rem", borderRadius: hover ? "1rem" : "50%" }
    const TextStyle = { fontSize: hover ? "0.72rem" : "0.8rem", marginTop: hover ? "0.2rem" : "0.1rem" }
    const playButtonStyle = { position: "absolute", zIndex: 50, marginTop: "6rem", marginLeft: "6rem", opacity: hover ? "100%" : "0%", transition: "0.5s", boxShadow: "box-shadow: 1px 1px 1px #00000061" }

    return (
        <>
            {type === "song" && (
                <div className={styles.trackContainer} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    {item.image && (
                        <>
                            <img src={encodeURI(item.image)} alt={item.album} className={styles.albumImage} style={AlbumImageStyle}/>
                            <div style={playButtonStyle} className={styles.playButton} >
                                {!isMobile && (
                                    <PlayButton
                                        type = {currentSong?.album===item.album && isPlaying ? "pause" : "play"}
                                        onClick = {(e) => { e.stopPropagation(); handlePlayClick(item); }}
                                    />    
                                )}                                
                            </div>                            
                        </>
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
                        <img src={encodeURI(item.image_url)} alt={item.album} className={styles.artistImage} style={ArtistImageStyle} />
                    )}
                    <div className={styles.artistInfo}>
                        <p className={styles.trackTitle} style={artistNameStyle}>{item.name}</p>
                    </div>
                </div>
            )}
        </>
    );
}