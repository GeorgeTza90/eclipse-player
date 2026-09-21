import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAudio } from "@/contexts/AudioContextWeb";
import { useLibrary } from "@/contexts/LibraryContextWeb";
import { useAuth } from "@/contexts/AuthContextWeb";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import { useAlbumDuration } from "@/utils/formatTime";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useImageToast } from "@/components/ui/toasts/ImageToast";
import hexToRgba from "@/utils/hexToRgba";
import BackButton from "@/components/ui/buttons/BackButton";
import Loader from "@/components/ui/loaders/Loader";
import MiniPlayer from "@/components/player/mini/MiniPlayer";
import type { Song } from "@/types/songs.types";
import styles from "./collectionDetail.module.css";
import AlbumSongs from "./parts/AlbumSongs";
import AlbumInfo from "./parts/AlbumInfo";

const PrivateCollectionDetail = () => {
    const { user } = useAuth();
    const { privateSongs } = useLibrary();
    const { barMode } = useMiniPlayer();
    const { playSong } = useAudio();
    const { showImageToast, ImageToastUI } = useImageToast();
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const { album } = useParams();

    const albumSongs = useMemo(() => privateSongs.filter(s => s.album === album) ,[privateSongs, album]);
    const durationString = useAlbumDuration(albumSongs);
    const albumInfo = albumSongs[0];

    /* --- STYLES --- */    
    const containerStyle = { background: `linear-gradient(to bottom, ${hexToRgba(albumSongs[0].averageColor, 0.2)}, #131316f3 )` }

    /* --- PRESS SONG --- */
    const handlePressSong = async (song: Song) => {
        await playSong(song, albumSongs, album);
        navigate("/player");
    };    

    /* --- LOADING --- */
    if (!albumSongs || albumSongs.length === 0) return (
        <div className={styles.loadingContainer}>
            <Loader text={"Loading Collection"}/>
        </div>
    )

    return (
        <div className={styles.container} style={containerStyle}>
            {!isMobile && user && !barMode && (<MiniPlayer />)}            
    {/* Info */}
            {ImageToastUI}
            <AlbumInfo
                albumInfo={albumInfo}
                albumSongs={albumSongs}
                onImageClick={() => {if (albumInfo.imageHQ) showImageToast(albumInfo.imageHQ)}}
                durationString={durationString}
            />

    {/* Tracks */}
            <AlbumSongs                
                albumSongs={albumSongs}
                onPress={handlePressSong}
            />
            <BackButton navTo={`/library`} />            
        </div>
    );
}

export default PrivateCollectionDetail;