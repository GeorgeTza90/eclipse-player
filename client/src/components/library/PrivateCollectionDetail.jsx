import { useNavigate, useSearchParams } from "react-router-dom";
import { useAudio } from "../../contexts/AudioContextWeb";
import { useLibrary } from "../../contexts/LibraryContextWeb";
import { useAlbumDuration } from "../../hooks/useFormatTime";
import { useAuth } from "../../contexts/AuthContextWeb";
import { useImageToast } from "../ui/ΙmageToast";
import ArtistButton from "../buttons/ArtistButton";
import BackButton from "../buttons/BackButton";
import styles from "./collectionDetail.module.css";
import PrivateTrackItem from "./PrivateTrackItem";
import hexToRgba from "../../utils/hexToRgba";

export default function CollectionDetail() {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();    
    const { privateSongs } = useLibrary();    
    const { playSong, currentSong } = useAudio();
    const { showImageToast, ImageToastUI } = useImageToast();
    const navigate = useNavigate();
    const album = searchParams.get("album");
    const albumSongs = privateSongs.filter(s => s.album === album);        

    if (!albumSongs || !albumSongs.length)  return <p className={{ color: "#fff", padding: "10px" }}>No collection data</p>;

    const albumInfo = albumSongs[0];
    const durationString = useAlbumDuration(albumSongs);
    
    const handlePressSong = (song) => { playSong(song, albumSongs, album); navigate("/player"); };    

    /* --- STYLES --- */
    const headerStyle = { background: `linear-gradient(to bottom, ${hexToRgba(albumSongs[0].averageColor, 0.1)}, #55555500 )` }
    const containerStyle = { background: `linear-gradient(to bottom, ${hexToRgba(albumSongs[0].averageColor, 0.2)}, #131316f3 )` }

    return (
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
                    <PrivateTrackItem key={item.id} track={item} index={index} type="private" onPress={handlePressSong} user={user} />
                ))}

                <BackButton navTo={`/library`} />
            </div>
        </div>
    );
}
