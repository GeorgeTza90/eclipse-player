import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContextWeb";
import { fetchUserPlaylists } from "../../services/GetService";
import { addSongToPlaylist } from "../../services/PostService";
import { useToast } from "../../contexts/ToastContextWeb";
import styles from "./addToPlaylistButton.module.css";

export default function AddToPlaylistButton({ song }) {
    const { token } = useAuth();
    const { showToast } = useToast();
    const [modalVisible, setModalVisible] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (modalVisible && token) {
            const loadPlaylists = async () => {
                setLoading(true);
                try {
                    const data = await fetchUserPlaylists(token);
                    setPlaylists(data);
                } catch (err) {
                    console.error("Failed to fetch playlists", err);
                    showToast("Could not load playlists", "error");
                } finally {
                    setLoading(false);
                }
            };
            loadPlaylists();
        }
    }, [modalVisible, token, showToast]);

    const handleAddToPlaylist = async (playlistId) => {
        if (!token) return;
        try {
            await addSongToPlaylist(playlistId, song.id, token);
            showToast(`Added "${song.title}" to playlist`, "success");
            setModalVisible(false);
        } catch (err) {
            const msg = err.message?.includes("already in playlist")
                ? `"${song.title}" is already in this playlist`
                : "Could not add song to playlist";
            console.error(msg, err);
            showToast(msg, "error");
        }
    };

    return (
        <>
            <button className={styles.button}
                onClick={(e) => {
                    e.stopPropagation();
                    setModalVisible(true);
                }}
            >
                +
            </button>

            {modalVisible && (
                <div className={styles.modalOverlay} onClick={() => setModalVisible(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalTitle}>
                            Add "{song.title}" to playlist
                        </div>

                        {loading ? (
                            <div style={{ color: "#fff", marginTop: 10 }}>
                                Loading playlists...
                            </div>
                        ) : (
                            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                                {playlists.length ? (
                                    playlists.map((item) => (
                                        <div
                                            key={item.id}
                                            className={styles.playlistItem}
                                            onClick={() => handleAddToPlaylist(item.id)}
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
