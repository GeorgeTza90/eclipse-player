import React, { useState } from "react";
import type { CSSProperties } from "react";
import { useAudio } from "@/contexts/AudioContextWeb";
import { useLibrary } from "@/contexts/LibraryContextWeb";
import { useIsMobile } from "@/hooks/useIsMobile";
import { groupArtistsByRole } from "@/utils/groupArtistsByRole";
import PlayButton from "@/components/ui/buttons/PlayButton";
import type{ CardProps } from "@/types/library.types";
import type { Song } from "@/types/songs.types";
import type { Artist } from "@/types/artists.types";
import styles from "./collectionCard.module.css";


const CollectionCard = ({ item, onClick, type }: CardProps) => {
    const { playSong, currentSong, isPlaying, togglePlay, stop } = useAudio();
    const [ hover, setHover ] = useState(false);
    const { songs, privateSongs } = useLibrary();
    const isMobile = useIsMobile();    
    
    const { mainArtists } = groupArtistsByRole((item as Song).artists);    
    const artists = mainArtists?.join(", ") || null;

    /* --- INSTANT PLAY LOGIC --- */
    const handlePlayClick = (item: Song) => {        
        const albumSongs = type === "private" ? privateSongs.filter(s => s.album === item.album) : songs.filter(s => s.album === item.album);
        if (currentSong?.album === item.album) { togglePlay(); return; }
        if (isPlaying) stop();
        playSong(albumSongs[0], albumSongs, item.album);
    };    

    /* --- STYLES --- */
    const trackYearStyle = { display: hover ? "hidden" : "block", color: hover ?  "#a0a0a000" : "#a0a0a0e0", fontSize: "0.72rem", margin: "2px 0" };
    const artistNameStyle = { fontSize: hover ? "0.75rem" : "0.85rem", color: hover ?  "#a0a0a000" : "#a0a0a0e0" }
    const AlbumImageStyle = { width: isMobile ? "6rem" : (hover ? "9rem" : "7rem"), margin: hover ? "-0.15rem" : "0rem", borderRadius: hover ? "0rem" : "0.4rem" }
    const ArtistImageStyle = { width: isMobile ? "6rem" : (hover ? "9rem" : "7rem"), margin: hover ? "-0.15rem" : "0rem", borderRadius: hover ? "1rem" : "50%" }
    const TextStyle = { fontSize: hover ? "0.72rem" : "0.8rem", marginTop: hover ? "0.2rem" : "0.1rem" }
    const playButtonStyle: CSSProperties = { position: "absolute", zIndex: 50, marginTop: "6rem", marginLeft: "6rem", opacity: hover ? "100%" : "0%", transition: "0.5s", boxShadow: "1px 1px 1px #00000061" }

    return (<>
    {/* SONG */}
        {(type === "song" || type === "private") && (
            <div className={styles.trackContainer} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <div className={styles.glowDiv}></div>                
                {(item as Song).image && (
                    <>
                        <img src={encodeURI((item as Song).image)} alt={(item as Song).album} className={styles.albumImage} style={AlbumImageStyle}/>
                        <div style={playButtonStyle} className={styles.playButton} >
                            {!isMobile && (
                                <PlayButton
                                    type = {currentSong?.album===(item as Song).album && isPlaying ? "pause" : "play"}
                                    onClick = {(e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); handlePlayClick((item as Song)); }}
                                />    
                            )}                                
                        </div>                            
                    </>
                )}
                <div className={styles.trackInfo}>
                    <p className={styles.trackTitle} style={TextStyle}>{(item as Song).album}</p>
                    <p className={styles.trackArtist}>{artists ? artists : (item as Song).artist}</p>
                    <p className={styles.trackYear} style={trackYearStyle} > {hover ? "" : (item as Song).year}</p>
                </div>
            </div>
        )}

    {/* ARTIST */}
        {(type === "artist" && (item as Artist).roles.includes("main")) && (
            <div className={styles.artistContainer} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {(item as Artist).image_url && (
                    <img src={encodeURI((item as Artist).image_url)} alt={(item as Artist).album} className={styles.artistImage} style={ArtistImageStyle} />
                )}
                <div className={styles.artistInfo}>
                    <p className={styles.trackTitle} style={artistNameStyle}>{(item as Artist).name}</p>
                </div>
            </div>
        )}        
    </>);
}

export default CollectionCard;