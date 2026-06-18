import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAudio } from "../../contexts/AudioContextWeb";
import { useLibrary } from "../../contexts/LibraryContextWeb";
import { useAuth } from "../../contexts/AuthContextWeb";
import { useMiniPlayer } from "../../contexts/MiniPlayerContextWeb";
import { useAlbumDuration } from "../../hooks/useFormatTime";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useImageToast } from "../ui/toasts/ΙmageToast";
import hexToRgba from "../../utils/hexToRgba";
import ArtistButton from "../ui/buttons/ArtistButton";
import BackButton from "../ui/buttons/BackButton";
import LoadingMessage from "../ui/loaders/LoadingMessage";
import PrivateTrackItem from "./PrivateTrackItem";
import MiniPlayer from "../player/MiniPlayer";
import styles from "./collectionDetail.module.css";

const CollectionDetail = () => {
    const { user } = useAuth();
    const location = useLocation();    
    const { privateSongs } = useLibrary();    
    const { barMode, setPlayerPage } = useMiniPlayer();
    const { playSong, currentSong } = useAudio();
    const { showImageToast, ImageToastUI } = useImageToast();
    const isMobile = useIsMobile();
    const navigate = useNavigate(); 

    const { album } = useParams();
    const albumSongs = useMemo(() => privateSongs.filter(s => s.album === album) ,[privateSongs, album]);

    /* --- LOADING --- */
    if (!albumSongs || albumSongs.length === 0) return <LoadingMessage />

    const albumInfo = albumSongs[0];
    const durationString = useAlbumDuration(albumSongs);

    /* --- PRESS SONG --- */
    const handlePressSong = (song) => { playSong(song, albumSongs, album); navigate("/player"); };    

    /* --- STYLES --- */
    const headerStyle = { background: `linear-gradient(to bottom, ${hexToRgba(albumSongs[0].averageColor, 0.1)}, #55555500 )` }
    const containerStyle = { background: `linear-gradient(to bottom, ${hexToRgba(albumSongs[0].averageColor, 0.2)}, #131316f3 )` }

    return (
        <div className={styles.container} style={containerStyle}>

            {!isMobile && user && !barMode && (<MiniPlayer />)}
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
                        {albumInfo.artist || "Artist Name"} • {albumSongs.length} songs • {durationString}
                    </p>
                </div>
            </div>

    {/* Tracks */}
            <div>
                {albumSongs.map((item, index) => (
                    <PrivateTrackItem key={item.id} track={item} index={index} type="private" onPress={handlePressSong} user={user} />
                ))}

                <BackButton navTo={`/library`} />
            </div>
        </div>
    );
}

export default CollectionDetail;