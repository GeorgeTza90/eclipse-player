import { useState } from "react";
import { useAudio } from "../../contexts/AudioContextWeb";
import { useLibrary } from "../../contexts/LibraryContextWeb";
import { useIsMobile } from "../../hooks/useIsMobile";
import PlayButton from "../ui/buttons/PlayButton";
import styles from "./vinylCard.module.css"

const CollectionCard = ({ item, onClick, type }) => {
    const { playSong, currentSong, isPlaying, togglePlay, stop } = useAudio();    
    const [ hover, setHover ] = useState(false);
    const { songs, privateSongs } = useLibrary();
    const isMobile = useIsMobile();

    /* --- INSTANT PLAY LOGIC --- */
    const handlePlayClick = (item) => {        
        const albumSongs = type === "private" ? privateSongs.filter(s => s.album === item.album) : songs.filter(s => s.album === item.album);
        if (currentSong?.album === item.album) { togglePlay(); return; }
        if (isPlaying) stop();
        playSong(albumSongs[0], albumSongs, item.album);
    };    

    /* --- STYLES --- */  
    return (<>
        <div className={styles.trackContainer} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>                
            {item.image && (
                <>
                    <div className={styles.imageDiv}>
                        <div className={styles.blackOverlay}/>
                        <img src={encodeURI(item.image)} alt={item.album} className={styles.albumImage}/>
                    </div>
                    <div className={styles.vinylImage}>                            
                        <img src={encodeURI("/assets/images/vinylImage.png")} alt={item.album} className={styles.albumImageVinyl}/>
                        <img src={encodeURI(item.image)} alt={item.album} className={styles.albumImageOnVinyl}/>
                    </div>
                </>
            )}
        </div>            
    </>);
}

export default CollectionCard;