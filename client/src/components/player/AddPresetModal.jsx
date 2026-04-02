import { useState } from "react";
import { usePostManager } from "../../hooks/usePostManager";
import { useToast } from "../../contexts/ToastContextWeb";
import styles from "./addPresetModal.module.css";

export default function AddPresetModal({ visible, onClose, onCreated, eqGains }) {
    const { loading, call } = usePostManager();
    const { showToast } = useToast();
    const [title, setTitle] = useState("");
    const isLoading = loading.createPreset;

    if (!visible) return null;

    const handleCreate = async () => {
        if (!title.trim()) return showToast("Playlist title is required", "error");
        if (title.length < 2 ) return showToast("Playlist title minimum length is 2 characters", "error")
        if (title.length > 20 ) return showToast("Playlist title maximum length is 20 characters", "error")

        try {                                    
            await call("createPreset", title, eqGains)
            setTitle("");            
            showToast("Preset created successfully", "success");
            onCreated?.();
            onClose?.();
        } catch (err) {            
            showToast("Could not create preset", "error");
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
                    disabled={isLoading}
                />                
                <button
                    className={styles.modalButton}
                    onClick={() => handleCreate()}
                    disabled={isLoading}
                >
                    {isLoading ? "Creating..." : "Create"}
                </button>
                <button
                    className={`${styles.modalButton} ${styles.modalCancel}`}
                    onClick={onClose}
                    disabled={isLoading}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
