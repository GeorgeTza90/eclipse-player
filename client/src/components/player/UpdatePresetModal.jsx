import { useState, useEffect } from "react";
import { updatePreset } from "../../services/PostService";
import { useToast } from "../../contexts/ToastContextWeb";
import { usePostManager } from "../../hooks/usePostManager";
import styles from "./addPresetModal.module.css";

export default function UpdatePresetModal({ visible, onClose, onCreated, presetNew, newEQ }) {
    const { state, loading, error, call } = usePostManager();
    const { showToast } = useToast();
    const [id, setId] = useState(null);
    const [title, setTitle] = useState("");
    const [preset, setPreset] = useState({});
    const isLoading = loading["updatePreset"];

    useEffect(() => {if (presetNew) { setId(presetNew.id); setTitle(presetNew.title); setPreset(newEQ); }}, [presetNew]);

    if (!visible) return null;

    const handleUpdate = async () => {
        if (!title.trim()) return showToast("Preset title is required", "error");
        if (title.length < 2) return showToast("Preset title minimum length is 2 characters", "error");
        if (title.length > 20) return showToast("Preset title maximum length is 20 characters", "error");

        try {            
            await call("updatePreset", id, title, JSON.stringify(preset));
            showToast("Preset updated successfully", "success");
            onCreated?.();
            onClose?.();
        } catch (err) {            
            showToast("Could not update preset", "error");
        }
    };

    console.log(loading)

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <input
                    type="text"
                    placeholder="Preset Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                    disabled={loading["updatePreset"]}
                />
                <button
                    className={styles.modalButton}
                    onClick={handleUpdate}
                    disabled={loading["updatePreset"]}
                >
                    {loading["updatePreset"] ? "Updating..." : "Update"}
                </button>
                <button
                    className={`${styles.modalButton} ${styles.modalCancel}`}
                    onClick={onClose}
                    disabled={loading["updatePreset"]}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}