import { useState } from "react";
import styles from "./addPlaylistModal.module.css";
import { createPlaylist } from "../../services/PostService";
import { useToast } from "../../contexts/ToastContextWeb";

export default function AddPlaylistModal({ visible, onClose, token, onCreated }) {
    const { showToast } = useToast();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    if (!visible) return null;

    const handleCreate = async () => {
        if (!title.trim()) {
            showToast("Playlist title is required", "error");
            return;
        }

        try {
            setLoading(true);
            await createPlaylist(token, title, description);
            setTitle("");
            setDescription("");
            showToast("Playlist created successfully", "success");
            onCreated?.();
            onClose?.();
        } catch (err) {
            console.error("Failed to create playlist:", err);
            showToast("Could not create playlist", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <input
                    type="text"
                    placeholder="Playlist Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                    disabled={loading}
                />
                <input
                    type="text"
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.input}
                    disabled={loading}
                />
                <button
                    className={styles.modalButton}
                    onClick={handleCreate}
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create"}
                </button>
                <button
                    className={`${styles.modalButton} ${styles.modalCancel}`}
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
