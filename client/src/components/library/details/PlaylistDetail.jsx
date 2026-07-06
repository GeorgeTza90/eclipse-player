import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAudio } from "../../../contexts/AudioContextWeb";
import { useMiniPlayer } from "../../../contexts/MiniPlayerContextWeb";
import { useAuth } from "../../../contexts/AuthContextWeb";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { useAlbumDuration } from "../../../hooks/useFormatTime";
import { useFetchManager, usePutManager } from "../../../hooks/useCallManager";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import PlaylistSongItem from "./items/PlaylistSongItem";
import MiniPlayer from "../../player/mini/MiniPlayer";
import EditPlaylistModal from "../../ui/modals/EditPlaylistModal";
import BackButton from "../../ui/buttons/BackButton";
import Loader from "../../ui/loaders/Loader";
import styles from "./playlistDetail.module.css";

const PlaylistDetail = () => {
    const { state: fetchState, loading: fetchLoading, call: fetchCall } = useFetchManager();
    const { call: putCall } = usePutManager();
    const location = useLocation();
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { playSong } = useAudio();
    const { barMode } = useMiniPlayer();
    const { user } = useAuth();

    const playlist = location.state;

    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState(playlist?.title || "");
    const [description, setDescription] = useState(playlist?.description || "");
    const [localSongs, setLocalSongs] = useState([]);

    const albumDuration = useAlbumDuration(localSongs);
    const loading = fetchLoading.playlistSongs;

    /* --- GUARD --- */
    if (!playlist) { navigate("/"); return null; }

    const id = playlist.id;

    /* --- LOAD PLAYLIST SONGS --- */
    useEffect(() => {
        if (!id) return;
        fetchCall("playlistSongs", id).catch(() => navigate("/"));
    }, [id, fetchCall, navigate]);

    /* --- SYNC LOCAL SONGS --- */
    useEffect(() => {
        if (fetchState.playlistSongs) setLocalSongs(fetchState.playlistSongs);
    }, [fetchState.playlistSongs]);

    /* --- SONG PLAY --- */
    const handlePlay = async (song) => {
        try {
            await playSong(song, localSongs, title);
            navigate("/player");
        } catch {
            alert("Could not play song");
        }
    };

    /* --- DRAG/DROP --- */
    const handleDragEnd = async (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const reorderedSongs = Array.from(localSongs);
        const [movedSong] = reorderedSongs.splice(source.index, 1);
        reorderedSongs.splice(destination.index, 0, movedSong);
        setLocalSongs(reorderedSongs);

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
                    <button className={styles.updateButton} onClick={() => setModalVisible(true)} />
                </div>
                {description && <h2 className={styles.description}>{description}</h2>}
                <p className={styles.artistInfo}>{localSongs.length} songs • {albumDuration}</p>
            </div>

            {loading ? (
                <div className={styles.centered}>
                    <Loader text={"Loading songs"} size={"small"} />
                </div>
            ) : localSongs.length === 0 ? (
                <div className={styles.centered}>
                    <p className={styles.noSongs}>No songs in this playlist yet.</p>
                </div>
            ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="playlist">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className={styles.songList}>
                                {localSongs.map((song, index) => (
                                    <Draggable key={song.id} draggableId={String(song.id)} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <PlaylistSongItem
                                                    item={song}
                                                    index={index}
                                                    onPlay={handlePlay}
                                                    onDelete={async (songId) => {
                                                        await fetchCall("playlistSongs", id);
                                                        setLocalSongs(prev => prev.filter(s => s.id !== songId));
                                                    }}
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

            <BackButton navTo={"/"} />

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
};

export default PlaylistDetail;