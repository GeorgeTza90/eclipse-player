import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAudio } from "@/contexts/AudioContextWeb";
import { useLibrary } from "@/contexts/LibraryContextWeb";
import { useAuth } from "@/contexts/AuthContextWeb";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import { useAlbumDuration } from "@/utils/formatTime";
import { useImageToast } from "@/components/ui/toasts/ImageToast";
import TrackItem from "./items/TrackItem";
import BackButton from "@/components/ui/buttons/BackButton";
import Loader from "@/components/ui/loaders/Loader";
import MiniPlayer from "@/components/player/mini/MiniPlayer";
import type { Song } from "@/types/songs.types";
import styles from "./collectionDetail.module.css";
import { useStylesLibrary } from "@/hooks/useStylesLibrary";

const PrivateCollectionDetail = () => {
    const { user } = useAuth();    
    const { privateSongs } = useLibrary();    
    const { barMode } = useMiniPlayer();
    const { playSong } = useAudio();
    const { showImageToast, ImageToastUI } = useImageToast();    
    const navigate = useNavigate(); 

    const { album } = useParams();
    const albumSongs = useMemo(() => privateSongs.filter(s => s.album === album) ,[privateSongs, album]);
    const durationString = useAlbumDuration(albumSongs);
    const { headerStyle, containerStyle2 } = useStylesLibrary({ averageColor: albumSongs[0]?.averageColor });

    /* --- LOADING --- */
    if (!albumSongs || albumSongs.length === 0) return (<div className={styles.loadingContainer}><Loader text={"Loading Collection"}/></div>)

    const albumInfo = albumSongs[0];

    /* --- PRESS SONG --- */
    const handlePressSong = async (song: Song) => {
        await playSong(song, albumSongs, album);
        navigate("/player");
    };    

    return (
        <div className={styles.container} style={containerStyle2}>

            {user && !barMode && (<MiniPlayer />)}
    {/* Info */}
            <div className={styles.header} style={headerStyle}>
                {albumInfo.image && (
                    <img src={albumInfo.image} alt={albumInfo.album} className={styles.albumImage} onClick={() => albumInfo.imageHQ && showImageToast(albumInfo.imageHQ)} />
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
                    <TrackItem key={item.id} track={item} index={index} onPress={handlePressSong} user={user} isPrivate={true} />
                ))}

                <BackButton navTo={`/library`} />
            </div>
        </div>
    );
}

export default PrivateCollectionDetail;