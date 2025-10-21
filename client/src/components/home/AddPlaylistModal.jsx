import { useState } from "react";
import styles from "./addPlaylistModal.module.css";
import { createPlaylist } from "../../services/PostService";

export default function AddPlaylistModal({ visible, onClose, token, onCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    if (!visible) return null;

    const handleCreate = async () => {
        if (!title.trim()) {
            alert("Playlist title is required");
            return;
        }
        try {
            await createPlaylist(token, title, description);
            setTitle("");
            setDescription("");
            onCreated();
            onClose();
        } catch (err) {
            console.error("Failed to create playlist:", err);
            alert("Could not create playlist");
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
                />
                <input
                    type="text"
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.input}
                />
                <button className={styles.modalButton} onClick={handleCreate}>
                    Create
                </button>
                <button
                    className={`${styles.modalButton} ${styles.modalCancel}`}
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
