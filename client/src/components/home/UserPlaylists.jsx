import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchManager } from "../../hooks/useCallManager";
import { useMinimumLoading } from "../../hooks/useMinimumLoading.";
import LoadingMessage from "../library/LoadingMessage"
import PlaylistItem from "./PlaylistItem";
import AddPlaylistModal from "./AddPlaylistModal";
import AddPlaylistButton from "../buttons/AddPlaylistButton";
import styles from "./userPlaylists.module.css";
import Loader from "../ui/Loader";


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
    if (loading.playlists) return <LoadingMessage message="Loading playlists ..." height="14vh"/>;  
    if (error.playlists) return <LoadingMessage message="Error loading playlists" height="14vh"/>;    

    //--- PRESS PLAYLIST ---//
    const handlePlaylistPress = (playlist) => navigate(`/library/PlaylistDetail?id=${playlist.id}&title=${encodeURIComponent(playlist.title)}`);

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