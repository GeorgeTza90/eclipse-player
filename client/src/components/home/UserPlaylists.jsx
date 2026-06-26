import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchManager } from "../../hooks/useCallManager";
import { useMinimumLoading } from "../../hooks/useMinimumLoading.";
import PlaylistItem from "./PlaylistItem";
import LoadingMessage from "../ui/loaders/LoadingMessage"
import AddPlaylistModal from "../ui/modals/AddPlaylistModal";
import AddPlaylistButton from "../ui/buttons/AddPlaylistButton";
import Loader from "../ui/loaders/Loader";
import styles from "./userPlaylists.module.css";

const UserPlaylists = () => {
    const { state, loading, error, call } = useFetchManager();
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);    
    const playlists = state.playlists || [];
    
    //--- LOAD PLAYLISTS ---//
    useEffect(() => {
        async function fetchPlaylists() { await call("playlists"); }
        fetchPlaylists();
    }, [call]); 
    
    const reloadPlaylists = useCallback(() => call("playlists"), [call]);

    //--- LOADING & MESSAGING --- */
    const showLoader = useMinimumLoading(loading.playlists, 500);
    if (showLoader) return <Loader text="Loading Playlists" size="small"/> 
    if (error.playlists) return <LoadingMessage message="Error loading playlists" height="14vh"/>;    

    //--- PRESS PLAYLIST ---//    
    const handlePlaylistPress = (playlist) => navigate(`/library/PlaylistDetail`, {state: playlist});

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

export default UserPlaylists;