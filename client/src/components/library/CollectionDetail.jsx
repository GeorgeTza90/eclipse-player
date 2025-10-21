import { useNavigate, useSearchParams } from "react-router-dom";
import { useAudio } from "../../contexts/AudioContextWeb";
import { useLibrary } from "../../contexts/LibraryContextWeb";
import { useAlbumDuration } from "../../hooks/useFormatTime";
import AddToPlaylistButton from "../buttons/AddToPlaylistButton";
import { useAuth } from "../../contexts/AuthContextWeb";
import styles from "./collectionDetail.module.css";

export default function CollectionDetail() {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const album = searchParams.get("album");
    const { songs } = useLibrary();
    const albumSongs = songs.filter(s => s.album === album);
    const { playSong } = useAudio();
    const navigate = useNavigate();

    if (!albumSongs || !albumSongs.length) {
        return <p className={{ color: "#fff", padding: "10px" }}>No collection data</p>;
    }

    const albumInfo = albumSongs[0];
    const durationString = useAlbumDuration(albumSongs);

    const handlePressSong = (song) => {
        playSong(song, albumSongs, album);
        navigate("/player");
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {albumInfo.image && (
                    <img src={albumInfo.image} alt={albumInfo.album} className={styles.albumImage} />
                )}
                <div className={styles.headerInfo}>
                    <p className={styles.type}>{albumInfo.type.toUpperCase()}</p>
                    <p className={styles.albumName}>{albumInfo.album}</p>
                    <p className={styles.artistInfo}>
                        {albumInfo.artist} • {albumSongs.length} songs • {durationString}
                    </p>
                </div>
            </div>

            <div>
                {albumSongs.map((item, index) => (
                    <div
                        key={item.id}
                        onClick={() => handlePressSong(item)}
                        className={styles.track}
                    >
                        <span className={styles.trackNumber}>{index + 1}.</span>
                        <span className={styles.trackTitle}>{item.title}</span>
                        {user && (
                            <div className={{ marginLeft: "10px" }}>
                                <AddToPlaylistButton song={item} />
                            </div>
                        )}
                        {item.duration && (
                            <span className={styles.trackDuration}>
                                {Math.floor(item.duration / 60)}:{("0" + (item.duration % 60)).slice(-2)}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
