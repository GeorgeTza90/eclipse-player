import { useState } from "react";
import styles from "./addPresetModal.module.css";
import { createPreset } from "../../services/PostService";
import { useToast } from "../../contexts/ToastContextWeb";

export default function AddPresetModal({ visible, onClose, onCreated, eqGains }) {
    const { showToast } = useToast();
    const [title, setTitle] = useState("");
    const [preset, setPreset] = useState(eqGains);
    const [loading, setLoading] = useState(false);   

    if (!visible) return null;

    const handleCreate = async () => {
        if (!title.trim()) return showToast("Playlist title is required", "error");
        if (title.length < 2 ) return showToast("Playlist title minimum length is 2 characters", "error")
        if (title.length > 20 ) return showToast("Playlist title maximum length is 20 characters", "error")

        try {            
            setLoading(true);
            await createPreset(title, eqGains);
            setTitle("");            
            showToast("Preset created successfully", "success");
            onCreated?.();
            onClose?.();
        } catch (err) {
            console.error("Failed to create preset:", err);
            showToast("Could not create preset", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <input
                    type="text"
                    placeholder="Preset Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
