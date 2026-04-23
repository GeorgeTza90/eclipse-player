import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAudio } from "../../contexts/AudioContextWeb";
import { useLibrary } from "../../contexts/LibraryContextWeb";
import { useAlbumDuration } from "../../hooks/useFormatTime";
import { useAuth } from "../../contexts/AuthContextWeb";
import { useImageToast } from "../ui/ΙmageToast";
import { useMiniPlayer } from "../../contexts/MiniPlayerContextWeb";
import LoadingMessage from "./LoadingMessage";
import ArtistButton from "../buttons/ArtistButton";
import BackButton from "../buttons/BackButton";
import styles from "./collectionDetail.module.css";
import TrackItem from "./TrackItem";
import hexToRgba from "../../utils/hexToRgba";
import MiniPlayer from "../player/MiniPlayer";
import { useIsMobile } from "../../hooks/useIsMobile";

export default function CollectionDetail() {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();    
    const { songs, loading } = useLibrary();    
    const { playSong, currentSong } = useAudio();
    const { showImageToast, ImageToastUI } = useImageToast();
    const { barMode, setPlayerPage } = useMiniPlayer();
    const isMobile = useIsMobile();
    const navigate = useNavigate();    
    const album = searchParams.get("album");
    const albumSongs = useMemo(() => songs.filter(s => s.album === album) ,[songs, album]);    
    
    /* --- LOADING --- */
    if (!albumSongs || albumSongs.length === 0) return <LoadingMessage />
    const albumInfo = albumSongs[0];
    const durationString = useAlbumDuration(albumSongs);

    /* --- PRESS SONG --- */
    const handlePressSong = (song) => { playSong(song, albumSongs, album).then( navigate("/player")); };    

    /* --- STYLES --- */
    const headerStyle = { background: `linear-gradient(to bottom, ${hexToRgba(albumSongs[0].averageColor, 0.1)}, #55555500 )` }
    const containerStyle = { background: `linear-gradient(to bottom, ${hexToRgba(albumSongs[0].averageColor, 0.2)}, #131316f3 )` }

    return (
        <>
            {!isMobile && user && !barMode && (<MiniPlayer />)}
            <div className={styles.container} style={containerStyle}>

        {/* Info */}
                <div className={styles.header} style={headerStyle}>
                    {albumInfo.image && (
                        <img src={albumInfo.image} alt={albumInfo.album} className={styles.albumImage} onClick={() => showImageToast(albumInfo.image)} />
                    )}
                    {ImageToastUI}
                    <div className={styles.headerInfo}>
                        <p className={styles.type}>{albumInfo.type.toUpperCase()}</p>
                        <p className={styles.albumName}>{albumInfo.album}</p>
                        <p className={styles.artistInfo}>
                            <ArtistButton artist={currentSong?.artist || "Artist Name"} size="0.9rem"/>                        
                            • {albumSongs.length} songs • {durationString}
                        </p>
                    </div>
                </div>

        {/* Tracks */}
                <div>
                    {albumSongs.map((item, index) => (
                        <TrackItem key={item.id} track={item} index={index} onPress={handlePressSong} user={user} />
                    ))}
                    
                    <BackButton navTo={`/library`} />
                </div>
            </div>
            <br/>
        </>
    );
}
