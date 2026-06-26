import { useEffect, useState } from "react";
import { useToast } from "../../../contexts/ToastContextWeb";
import { usePutManager } from "../../../hooks/useCallManager";
import styles from "./addPlaylistModal.module.css";

const EditPlaylistModal = ({ visible, onClose, onUpdated, currentTitle, currentDescription, playlistId }) => {
    const { showToast } = useToast();
    const { loading, call } = usePutManager();
    
    const [title, setTitle] = useState(currentTitle);
    const [description, setDescription] = useState(currentDescription);    

    const handleCreate = async () => {
        if (!title.trim()) return showToast("Playlist title is required", "error");
        if (title.length < 2) return showToast("Title min 2 chars", "error");
        if (title.length > 20) return showToast("Title max 20 chars", "error");

        try {
            await call("updatePlaylist", playlistId, title, description);            
            showToast("Playlist updated successfully", "success");
            onUpdated?.(title, description);            
            onClose?.();
        } catch {
            showToast("Could not update playlist", "error");
        }
    };

    useEffect(() => {
        if (visible) {
            setTitle(currentTitle);
            setDescription(currentDescription);
        }
    }, [visible, currentTitle, currentDescription]);  

    if (!visible) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <input
                    type="text"
                    placeholder="Playlist Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                    disabled={loading.updatePlaylist}
                />
                <input
                    type="text"
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.input}
                    disabled={loading.updatePlaylist}
                />
                <button
                    className={styles.modalButton}
                    onClick={handleCreate}
                    disabled={loading.updatePlaylist}
                >
                    {loading.updatePlaylist ? "Updating..." : "Update"}
                </button>
                <button
                    className={`${styles.modalButton} ${styles.modalCancel}`}
                    onClick={onClose}
                    disabled={loading.updatePlaylist}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default EditPlaylistModal;