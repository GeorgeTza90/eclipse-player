import { useNavigate, useSearchParams } from "react-router-dom";
import { useAudio } from "../../contexts/AudioContextWeb";
import { useLibrary } from "../../contexts/LibraryContextWeb";
import { useAlbumDuration } from "../../hooks/useFormatTime";
import { useAuth } from "../../contexts/AuthContextWeb";
import { useImageToast } from "../../hooks/useImageToast";
import ArtistButton from "../buttons/ArtistButton";
import BackButton from "../buttons/BackButton";
import styles from "./collectionDetail.module.css";
import TrackItem from "./TrackItem";

export default function CollectionDetail() {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();    
    const { songs } = useLibrary();    
    const { playSong, currentSong } = useAudio();
    const { showImageToast, ImageToastUI } = useImageToast();
    const navigate = useNavigate();
    const album = searchParams.get("album");
    const albumSongs = songs.filter(s => s.album === album);        

    if (!albumSongs || !albumSongs.length)  return <p className={{ color: "#fff", padding: "10px" }}>No collection data</p>;

    const albumInfo = albumSongs[0];
    const durationString = useAlbumDuration(albumSongs);

    const handlePressSong = (song) => { playSong(song, albumSongs, album); navigate("/player"); };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {albumInfo.image && (
                    <img src={albumInfo.image} alt={albumInfo.album} className={styles.albumImage} onClick={() => showImageToast(albumInfo.image)} />                        
                )}
                {ImageToastUI}
                <div className={styles.headerInfo}>
                    <p className={styles.type}>{albumInfo.type.toUpperCase()}</p>
                    <p className={styles.albumName}>{albumInfo.album}</p>
                    <p className={styles.artistInfo}>
                        <ArtistButton artist={currentSong?.artist || "Artist Name"} size="1.1rem"/>                        
                        • {albumSongs.length} songs • {durationString}
                    </p>
                </div>
            </div>

            <div>
                {albumSongs.map((item, index) => (
                    <TrackItem key={item.id} track={item} index={index} onPress={handlePressSong} user={user} />
                ))}

                <BackButton navTo={`/library`} />
            </div>
        </div>
    );
}
