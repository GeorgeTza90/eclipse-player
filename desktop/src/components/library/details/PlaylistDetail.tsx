import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAudio } from "@/contexts/AudioContextWeb";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import { useAuth } from "@/contexts/AuthContextWeb.tsx";
import { useAlbumDuration } from "@/utils/formatTime.ts";
import { useFetchManager, usePutManager } from "@/hooks/useCallManager";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import PlaylistSongItem from "./items/PlaylistSongItem";
import EmptyPlaylistItem from "./items/EmptyPlaylistItem";
import MiniPlayer from "@/components/player/mini/MiniPlayer";
import EditPlaylistModal from "@/components/ui/modals/EditPlaylistModal";
import BackButton from "@/components/ui/buttons/BackButton";
import Loader from "@/components/ui/loaders/Loader";
import { getErrorMessage } from "@/utils/getErrorMessage";
import type { Song } from "@/types/songs.types";
import styles from "./playlistDetail.module.css";

const PlaylistDetail = () => {
    const { state: fetchState, loading: fetchLoading, call: fetchCall } = useFetchManager();
    const { call: putCall, loading: putLoading } = usePutManager();
    const location = useLocation();
    const navigate = useNavigate();    
    const { playSong } = useAudio();
    const { barMode } = useMiniPlayer();
    const { user } = useAuth();

    const playlist = location.state;
    const id = playlist?.id;

    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState(playlist?.title || "");
    const [description, setDescription] = useState(playlist?.description || "");
    const [localSongs, setLocalSongs] = useState<Song[]>([]);

    const albumDuration = useAlbumDuration(localSongs);
    const songsLoading = fetchLoading.playlistSongs;
    const dragLoading = putLoading.moveSongInPlaylist;

    /* --- LOAD PLAYLIST SONGS --- */
    useEffect(() => {
        if (!id) return;
        fetchCall("playlistSongs", id).catch(() => navigate("/"));
    }, [id, fetchCall, navigate]);

    /* --- SYNC LOCAL SONGS --- */
    useEffect(() => {
        if (fetchState.playlistSongs) setLocalSongs(fetchState.playlistSongs);
    }, [fetchState.playlistSongs]);

    if (!playlist) {
        return (
            <div className={styles.container}>
                <EmptyPlaylistItem message="No playlist selected." navigateTo="/" buttonMessage="Back" />
            </div>
        );
    }

    /* --- SONG PLAY --- */
    const handlePlay = async (song: Song) => {
        try {
            await playSong(song, localSongs, title);
            navigate("/player");
        } catch {
            alert("Could not play song");
        }
    };

    /* --- DRAG/DROP --- */
    const handleDragEnd = async (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const reorderedSongs = Array.from(localSongs);
        const [movedSong] = reorderedSongs.splice(source.index, 1);
        reorderedSongs.splice(destination.index, 0, movedSong);
        setLocalSongs(reorderedSongs);

        try {            
            await putCall("moveSongInPlaylist", id, movedSong.playlistSongId, destination.index);
        } catch (err) {            
            alert(getErrorMessage(err, "Failed to move song. Order reverted."));
            fetchCall("playlistSongs", id);
        }
    };

    const handlePlaylistUpdate = (newTitle: string, newDescription: string) => {
        setTitle(newTitle);
        setDescription(newDescription);
    };

    return (
        <div className={styles.container}>
            {user && !barMode && (<MiniPlayer />)}

            <div>
                <div className={styles.titleDiv}>
                    <h2>{title}</h2>
                    <button className={styles.updateButton} onClick={() => setModalVisible(true)} />
                    {dragLoading && (<h4 className={styles.stateNotes}>Reordering Songs ...</h4>)}
                </div>
                {description && <h2 className={styles.description}>{description}</h2>}
                <p className={styles.artistInfo}>{localSongs.length} songs • {albumDuration}</p>
            </div>

            {songsLoading ? (
                <div className={styles.centered}>
                    <Loader text={"Loading songs"} size={"small"} />
                </div>
            ) : localSongs.length === 0 ? (
                <EmptyPlaylistItem message="No songs in this playlist yet." />
            ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="playlist" isDropDisabled={dragLoading}>
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
                                                        setLocalSongs(prev => prev.filter(s => s.id !== String(songId)));
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