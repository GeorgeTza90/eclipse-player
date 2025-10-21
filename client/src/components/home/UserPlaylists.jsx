import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router
import styles from "./userPlaylists.module.css";
import PlaylistItem from "./PlaylistItem";
import AddPlaylistModal from "./AddPlaylistModal";
import { fetchUserPlaylists } from "../../services/GetService";

export default function UserPlaylists({ token }) {
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        loadPlaylists();
    }, []);

    const loadPlaylists = async () => {
        setLoading(true);
        try {
            const data = await fetchUserPlaylists(token);
            setPlaylists(data);
        } catch (err) {
            console.error("Failed to load playlists:", err);
        } finally {
            setLoading(false);
        }
    };

    const handlePlaylistPress = (playlist) => {
        navigate(`/library/PlaylistDetail?id=${playlist.id}&title=${encodeURIComponent(playlist.title)}`);
    };

    return (
        <div className={styles.container}>
            {loading && <p className={styles.infoText}>Loading playlists...</p>}
            {!loading && playlists.length === 0 && (
                <p className={styles.infoText}>No playlists found.</p>
            )}

            <div className={styles.playlistsContainer}>
                {!loading &&
                    playlists.map((pl) => (
                        <PlaylistItem
                            key={pl.id}
                            playlist={pl}
                            token={token}
                            onDelete={loadPlaylists}
                            onPress={() => handlePlaylistPress(pl)}
                        />
                    ))}
            </div>
            <button
                className={styles.addButton}
                onClick={() => setModalVisible(true)}
            >
                + Add Playlist
            </button>

            <AddPlaylistModal
                visible={modalVisible}
                token={token}
                onCreated={loadPlaylists}
                onClose={() => setModalVisible(false)}
            />
        </div>
    );
}
