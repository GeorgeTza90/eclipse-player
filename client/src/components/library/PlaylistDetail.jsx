import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./playlistDetail.module.css";
import { fetchPlaylistSongs } from "../../services/GetService";
import { moveSongInPlaylist } from "../../services/PostService";
import { useAudio } from "../../contexts/AudioContextWeb";
import { useAuth } from "../../contexts/AuthContextWeb";
import { SongRow } from "./PlaylistSongItem";
import { useAlbumDuration } from "../../hooks/useFormatTime";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import BackButton from "../buttons/BackButton";

export default function PlaylistDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { token } = useAuth();
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const title = params.get("title");

    const { playSong } = useAudio();
    const durationString = useAlbumDuration(songs);

    const loadSongs = async () => {
        if (!token || !id) return;
        try {
            const data = await fetchPlaylistSongs(token, Number(id));
            setSongs(data);
        } catch (err) {
            console.error("Failed to load playlist songs", err);
            alert("Failed to load playlist songs");
        } finally {
            setLoading(false);
        }
    };

    const handlePlay = (song) => {
        try {
            playSong(song, songs, title);
            navigate("/player");
        } catch (err) {
            alert("Could not play song");
        }
    };

    const handleDragEnd = async (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const reorderedSongs = Array.from(songs);
        const [movedSong] = reorderedSongs.splice(source.index, 1);
        reorderedSongs.splice(destination.index, 0, movedSong);

        setSongs(reorderedSongs);

        if (!token || !id) return;
        try {
            await moveSongInPlaylist(
                Number(id),
                Number(movedSong.playlistSongId),
                destination.index,
                token
            );
        } catch (err) {
            console.error("Failed to move song", err);
            setSongs(songs);
            alert(err.message || "Failed to move song. Order reverted.");
        }
    };

    useEffect(() => {
        loadSongs();
    }, [id, token]);

    return (
        <div className={styles.container}>
            <div className={styles.headerInfo}>
                <h2 className={styles.playlistTitle}>{title}</h2>
                <p className={styles.artistInfo}>
                    {songs.length} songs • {durationString}
                </p>
            </div>

            {loading ? (
                <div className={styles.centered}>
                    <div className={styles.spinner}></div>
                    <p className={styles.loadingText}>Loading songs...</p>
                </div>
            ) : songs.length === 0 ? (
                <div className={styles.centered}>
                    <p className={styles.noSongs}>No songs in this playlist yet.</p>
                </div>
            ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="playlist">
                        {(provided) => (
                            <div
                                className={styles.songList}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {songs.map((song, index) => (
                                    <Draggable
                                        key={song.id}
                                        draggableId={String(song.id)}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <SongRow
                                                    item={song}
                                                    index={index}
                                                    onPlay={handlePlay}
                                                    onDelete={(songId) =>
                                                        setSongs((prev) =>
                                                            prev.filter((s) => s.id !== songId)
                                                        )
                                                    }
                                                    playlistId={Number(id)}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )}

            <BackButton navTo={`/`} />
        </div>
    );
}
