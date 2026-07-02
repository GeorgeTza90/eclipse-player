import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAudio } from "../../../contexts/AudioContextWeb";
import { useMiniPlayer } from "../../../contexts/MiniPlayerContextWeb";
import { useAuth } from "../../../contexts/AuthContextWeb";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { useAlbumDuration } from "../../../hooks/useFormatTime";
import { useFetchManager, usePostManager, usePutManager } from "../../../hooks/useCallManager";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { groupArtistsByRole } from "../../../utils/groupArtistsByRole";
import PlaylistSongItem from "./items/PlaylistSongItem";
import MiniPlayer from "../../player/mini/MiniPlayer";
import EditPlaylistModal from "../../ui/modals/EditPlaylistModal";
import BackButton from "../../ui/buttons/BackButton";
import Loader from "../../ui/loaders/Loader";
import styles from "./playlistDetail.module.css";

const PlaylistDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { playSong } = useAudio();
    const isMobile = useIsMobile();
    const { barMode, setPlayerPage } = useMiniPlayer();
    const { user } = useAuth();    

    const playlist = location.state;
    const id = playlist.id;
    // const title = playlist.title;
    // const description = playlist.description;
    
    const { state: fetchState, loading: fetchLoading, call: fetchCall } = useFetchManager();
    const { call: putCall } = usePutManager();
    const songs = fetchState.playlistSongs || [];
    const loading = fetchLoading.playlistSongs;

    const [ modalVisible, setModalVisible ] = useState(false);
    const [ title, setTitle ] = useState(playlist.title);
    const [ description, setDescription ] = useState(playlist.description);
    
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
            await putCall("moveSongInPlaylist", id, movedSong.playlistSongId, destination.index);
        } catch (err) {
            alert(err.message || "Failed to move song. Order reverted.");
            fetchCall("playlistSongs", id);
        }
    };

    const handlePlaylistUpdate = (newTitle, newDescription) => {
        setTitle(newTitle);
        setDescription(newDescription);
    };

    return (
        <div className={styles.container}>
            {!isMobile && user && !barMode && (<MiniPlayer />)}

            <div>
                <div className={styles.titleDiv}>
                    <h2>{title}</h2>
                    <button  className={styles.updateButton} onClick={() => setModalVisible(true)}/>
                </div>                
                {description && (<h2 className={styles.description}>{description}</h2>)}
                <p className={styles.artistInfo}>{songs.length} songs • {useAlbumDuration(songs)}</p>
                
            </div>

            {loading ? (
                <div className={styles.centered}>
                    <Loader text={"Loading songs"} size={"small"}/>
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
                                        <PlaylistSongItem
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

            <EditPlaylistModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onUpdated={handlePlaylistUpdate}
                currentTitle={title}
                currentDescription={description}
                playlistId={playlist.id}
            />
        </div>
    );
}

export default PlaylistDetail;