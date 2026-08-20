import { useState, useEffect } from "react";
import { useFetchManager, usePostManager } from "@/hooks/useCallManager";
import { useToast } from "@/contexts/ToastContextWeb";
import type { PlaylistButtonProps } from "@/types/ui.types";
import styles from "./addToPlaylistButton.module.css";
import { Playlist } from "@/types/playlists.types";
import { getErrorMessage } from "@/utils/getErrorMessage";

const AddToPlaylistButton = ({ song }: PlaylistButtonProps) => {    
    const { showToast } = useToast();
    const [modalVisible, setModalVisible] = useState(false);    

    const { state: fetchState, loading: fetchLoading, call: fetchCall} = useFetchManager();
    const { loading: postLoading, call: postCall} = usePostManager();
    const loading = fetchLoading?.playlists;
    const playlists: Playlist[] = fetchState?.playlists;
    const isAdding = postLoading?.addSongToPlaylist;

    //--- LOAD PLAYLISTS ---//
    useEffect(() => {
        if (modalVisible) {
            const loadPlaylists = async () => {                
                try {
                    await fetchCall("playlists");
                } catch (err) {                    
                    showToast("Could not load playlists", "error");
                }
            };
            loadPlaylists();
        }
    }, [modalVisible, showToast, fetchCall]);

    //--- ADD TO PLAYLISTS ---//
    const handleAddToPlaylist = async (playlistId: number) => {        
        try {
            await postCall("addSongToPlaylist", playlistId, song.id);
            showToast(`Added "${song.title}" to playlist`, "success");
            setModalVisible(false);
        } catch (err) {
            const msg = getErrorMessage(err, "")?.includes("Song already in playlist")
                ? `"${song.title}" is already in this playlist`
                : "Could not add song to playlist";            
            showToast(msg, "error");
        }
    };

    return (
        <>
            <button className={styles.button} onClick={(e) => { e.stopPropagation(); setModalVisible(true); }}>+</button>
            {modalVisible && (
                <div className={styles.modalOverlay} onClick={() => setModalVisible(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalTitle}>
                            Add "{song.title}" to playlist
                        </div>

                        {loading ? (
                            <div style={{ color: "#fff", marginTop: 10 }}>Loading playlists...</div>
                        ) : (
                            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                                {playlists?.length ? (
                                    playlists.map((item) => (
                                        <div
                                            key={item.id}
                                            className={styles.playlistItem}
                                            onClick={() => !isAdding && handleAddToPlaylist(item.id)}
                                        >
                                            {item.title}
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ color: "#fff" }}>No playlists found</div>
                                )}
                            </div>
                        )}

                        <button
                            className={`${styles.button} ${styles.cancel}`}
                            onClick={() => setModalVisible(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddToPlaylistButton;