import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAudio } from "../../contexts/AudioContextWeb";
import { SongRow } from "./PlaylistSongItem";
import { useAlbumDuration } from "../../hooks/useFormatTime";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useFetchManager } from "../../hooks/useFetchManager";
import { usePostManager } from "../../hooks/usePostManager";
import BackButton from "../buttons/BackButton";
import styles from "./playlistDetail.module.css";

export default function PlaylistDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { playSong } = useAudio();

    const params = new URLSearchParams(location.search);
    const id = Number(params.get("id"));
    const title = params.get("title");    
    
    const { state: fetchState, loading: fetchLoading, call: fetchCall } = useFetchManager();
    const { call: postCall } = usePostManager();
    const songs = fetchState.playlistSongs || [];
    const loading = fetchLoading.playlistSongs;
    
    /* --- LOAD PLAYLIST SONGS --- */
    useEffect(() => {
        if (!id) return;
        fetchCall("playlistSongs", id).catch(() => navigate("/"));
    }, [id, fetchCall, navigate]);

    /* --- SONG PLAY --- */
    const handlePlay = (song) => {
        try { playSong(song, songs, title).then(navigate("/player")); }
        catch (err) { alert("Could not play song"); }
    };
    
    /* --- DRAG/DROP SONG LOGIC --- */
    const handleDragEnd = async (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const reorderedSongs = Array.from(songs);
        const [movedSong] = reorderedSongs.splice(source.index, 1);

        reorderedSongs.splice(destination.index, 0, movedSong);        
        fetchState.playlistSongs = reorderedSongs;
        if (!id) return;

        try {
            await postCall("moveSongInPlaylist", id, movedSong.playlistSongId, destination.index);
        } catch (err) {
            alert(err.message || "Failed to move song. Order reverted.");
            fetchCall("playlistSongs", id); // reload from server
        }
    };

    return (
        <div className={styles.container}>
        <div className={styles.headerInfo}>
            <h2 className={styles.playlistTitle}>{title}</h2>
            <p className={styles.artistInfo}>{songs.length} songs • {useAlbumDuration(songs)}</p>
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
                <div ref={provided.innerRef} {...provided.droppableProps} className={styles.songList}>
                    {songs.map((song, index) => (
                        <Draggable key={song.id} draggableId={String(song.id)} index={index}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <SongRow
                                        item={song}
                                        index={index}
                                        onPlay={handlePlay}
                                        onDelete={(songId) =>   
                                            fetchCall("playlistSongs", id).then(data => data?.filter(s => s.id !== songId)                                            )
                                        }
                                        playlistId={id}
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