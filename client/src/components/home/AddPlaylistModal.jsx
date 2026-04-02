import { useState } from "react";
import { usePostManager } from "../../hooks/usePostManager";
import { useToast } from "../../contexts/ToastContextWeb";
import styles from "./addPlaylistModal.module.css";

export default function AddPlaylistModal({ visible, onClose, onCreated }) {
    const { showToast } = useToast();
    const { state, loading, error, call } = usePostManager();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    if (!visible) return null;

    const handleCreate = async () => {
        if (!title.trim()) return showToast("Playlist title is required", "error");
        if (title.length < 2) return showToast("Title min 2 chars", "error");
        if (title.length > 20) return showToast("Title max 20 chars", "error");

        try {
            await call("createPlaylist", title, description);
            setTitle("");
            setDescription("");
            showToast("Playlist created successfully", "success");
            onCreated?.();
            onClose?.();
        } catch {
            showToast("Could not create playlist", "error");
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
                disabled={loading.createPlaylist}
            />
            <input
                type="text"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.input}
                disabled={loading.createPlaylist}
            />
            <button
                className={styles.modalButton}
                onClick={handleCreate}
                disabled={loading.createPlaylist}
            >
                {loading.createPlaylist ? "Creating..." : "Create"}
            </button>
            <button
                className={`${styles.modalButton} ${styles.modalCancel}`}
                onClick={onClose}
                disabled={loading.createPlaylist}
            >
                Cancel
            </button>
        </div>
    </div>
  );
}