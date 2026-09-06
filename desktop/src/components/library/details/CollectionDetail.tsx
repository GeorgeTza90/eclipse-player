import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContextWeb.tsx";
import { useAudio } from "@/contexts/AudioContextWeb";
import { useLibrary } from "@/contexts/LibraryContextWeb";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import { useAlbumDuration } from "@/utils/formatTime.ts";
import { useImageToast } from "../../ui/toasts/ImageToast";
import { groupArtistsByRole } from "@/utils/groupArtistsByRole";
import MiniPlayer from "@/components/player/mini/MiniPlayer";
import Loader from "@/components/ui/loaders/Loader";
import ArtistButton from "@/components/ui/buttons/ArtistButton";
import BackButton from "@/components/ui/buttons/BackButton";
import TrackItem from "./items/TrackItem";
import type { Song } from "@/types/songs.types";
import styles from "./collectionDetail.module.css";
import { useStylesLibrary } from "@/hooks/useStylesLibrary";

const CollectionDetail = () => {
    const { user } = useAuth();    
    const { songs } = useLibrary();    
    const { playSong } = useAudio();
    const { showImageToast, ImageToastUI } = useImageToast();
    const { barMode } = useMiniPlayer();    
    const navigate = useNavigate();    

    const { album } = useParams();
    const albumSongs = useMemo(() => songs.filter(s => s.album === album) ,[songs, album]);    
    const durationString = useAlbumDuration(albumSongs);    
    const { headerStyle, containerStyle2 } = useStylesLibrary({ averageColor: albumSongs[0]?.averageColor });

    /* --- LOADING --- */
    if (!albumSongs || albumSongs.length === 0) return (<div className={styles.loadingContainer}><Loader text={"Loading Collection"}/></div>);
    const albumInfo: Song = albumSongs[0]; 
    
    const { mainArtists } = groupArtistsByRole(albumInfo.artists);    

    /* --- PRESS SONG --- */
    const handlePressSong = async (song: Song) => {
        await playSong(song, albumSongs, album);     
        navigate("/player");
    };
    
    return (
        <>
            {user && !barMode && (<MiniPlayer />)}
            <div className={styles.container} style={containerStyle2}>

        {/* Info */}
                <div className={styles.header} style={headerStyle}>
                    {albumInfo.image && (
                        <img src={albumInfo.image} alt={albumInfo.album} className={styles.albumImage} onClick={() => {if (albumInfo.imageHQ) showImageToast(albumInfo.imageHQ)}} />
                    )}
                    {ImageToastUI}
                    <div className={styles.headerInfo}>
                        <p className={styles.type}>{albumInfo.type.toUpperCase()}</p>
                        <p className={styles.albumName}>{albumInfo.album}</p>
                        <p className={styles.artistInfo}>
                            {mainArtists.map((artist) => (
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
                        <TrackItem key={item.id} track={item} index={index} onPress={handlePressSong} user={user} isPrivate={false}/>
                    ))}
                    
                    <BackButton navTo={`/library`} />
                </div>
            </div>
            <br/>
        </>
    );
}

export default CollectionDetail;