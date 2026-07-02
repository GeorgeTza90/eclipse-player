import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContextWeb";
import { useAudio } from "../../../contexts/AudioContextWeb";
import { useLibrary } from "../../../contexts/LibraryContextWeb";
import { useMiniPlayer } from "../../../contexts/MiniPlayerContextWeb";
import { useAlbumDuration } from "../../../hooks/useFormatTime";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { useImageToast } from "../../ui/toasts/ΙmageToast";
import { groupArtistsByRole } from "../../../utils/groupArtistsByRole";
import TrackItem from "./items/TrackItem";
import MiniPlayer from "../../player/mini/MiniPlayer";
import hexToRgba from "../../../utils/hexToRgba";
import Loader from "../../ui/loaders/Loader";
import ArtistButton from "../../ui/buttons/ArtistButton";
import BackButton from "../../ui/buttons/BackButton";
import LoadingMessage from "../../ui/loaders/LoadingMessage";
import styles from "./collectionDetail.module.css";


const CollectionDetail = () => {
    const { user } = useAuth();
    const location = useLocation();    
    const { songs, loading } = useLibrary();    
    const { playSong, currentSong } = useAudio();
    const { showImageToast, ImageToastUI } = useImageToast();
    const { barMode, setPlayerPage } = useMiniPlayer();
    const isMobile = useIsMobile();
    const navigate = useNavigate();       

    const { album } = useParams();
    const albumSongs = useMemo(() => songs.filter(s => s.album === album) ,[songs, album]);    
    
    /* --- LOADING --- */
    if (!albumSongs || albumSongs.length === 0) return (<div className={styles.loadingContainer}><Loader text={"Loading Collection"}/></div>)
        
    const albumInfo = albumSongs[0];
    const durationString = useAlbumDuration(albumSongs);
    const { mainArtists } = groupArtistsByRole(albumInfo.artists);    

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
                        <img src={albumInfo.image} alt={albumInfo.album} className={styles.albumImage} onClick={() => showImageToast(albumInfo.imageHQ)} />
                    )}
                    {ImageToastUI}
                    <div className={styles.headerInfo}>
                        <p className={styles.type}>{albumInfo.type.toUpperCase()}</p>
                        <p className={styles.albumName}>{albumInfo.album}</p>
                        <p className={styles.artistInfo}>
                            {mainArtists.map((artist, index) => (
                                <span key={artist}>
                                    <ArtistButton artist={artist || "Artist Name"} size="0.9rem" />
                                    {"• "}
                                </span>
                            ))}                            
                            {albumSongs.length} songs • {durationString}
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

export default CollectionDetail;