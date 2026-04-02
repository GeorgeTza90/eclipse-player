import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchManager } from "../../hooks/useFetchManager";
import PlaylistItem from "./PlaylistItem";
import AddPlaylistModal from "./AddPlaylistModal";
import AddPlaylistButton from "../buttons/AddPlaylistButton";
import styles from "./userPlaylists.module.css";

export default function UserPlaylists() {
    const { state, loading, error, call } = useFetchManager();
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
    const playlists = state.playlists || [];

    useEffect(() => {
        async function fetchPlaylists() { await call("playlists"); }
        fetchPlaylists();
    }, [call]);    
    
    const reloadPlaylists = useCallback(() => call("playlists"), [call]);

    if (loading.playlists) return <p className={styles.infoText}>Loading playlists...</p>;
    if (error.playlists) return <p className={styles.infoText}>Error loading playlists</p>;
    if (playlists.length === 0) return <p className={styles.infoText}>No playlists found.</p>;

    const handlePlaylistPress = (playlist) => {
        navigate(`/library/PlaylistDetail?id=${playlist.id}&title=${encodeURIComponent(playlist.title)}`);
    };

    return (
        <div className={styles.container}>
        <div className={styles.playlistsContainer}>
            {playlists.map((pl) => (
            <PlaylistItem
                key={pl.id}
                playlist={pl}
                onDelete={reloadPlaylists}
                onPress={() => handlePlaylistPress(pl)}
            />
            ))}
            <AddPlaylistButton onClick={() => setModalVisible(true)} />
        </div>

        <AddPlaylistModal
            visible={modalVisible}
            onCreated={reloadPlaylists}
            onClose={() => setModalVisible(false)}
        />
        </div>
    );
}