import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContextWeb.tsx";
import { useAudio } from "@/contexts/AudioContextWeb";
import { useLibrary } from "@/contexts/LibraryContextWeb";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import { useAlbumDuration } from "@/utils/formatTime.ts";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useImageToast } from "../../ui/toasts/ImageToast";
import hexToRgba from "@/utils/hexToRgba";
import MiniPlayer from "@/components/player/mini/MiniPlayer";
import Loader from "@/components/ui/loaders/Loader";
import type { Song } from "@/types/songs.types";
import AlbumInfo from "./parts/AlbumInfo";
import AlbumSongs from "./parts/AlbumSongs";
import BackButton from "@/components/ui/buttons/BackButton";
import styles from "./collectionDetail.module.css";

const CollectionDetail = () => {
    const { user } = useAuth();   
    const { songs } = useLibrary();    
    const { playSong } = useAudio();
    const { showImageToast, ImageToastUI } = useImageToast();
    const { barMode } = useMiniPlayer();
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const { album } = useParams();

    const albumSongs = useMemo(() => songs.filter(s => s.album === album) ,[songs, album]);    
    const durationString = useAlbumDuration(albumSongs);
    const albumInfo: Song = albumSongs[0];    
    
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
    );    
    
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

export default CollectionDetail;