import { useState } from "react";
import styles from "./deleteSongButton.module.css";
import { useAuth } from "../../contexts/AuthContextWeb";
import { deleteSongFromPlaylist } from "../../services/DeleteService";
import { useToast } from "../../contexts/ToastContextWeb";
import ConfirmModal from "../ui/ConfirmModal";

export default function DeleteSongButton({ playlistId, songId, onDeleted }) {
    const { token } = useAuth();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setConfirmVisible(true);
    };

    const handleConfirmDelete = async () => {
        setConfirmVisible(false);
        await handleDelete();
    };

    const handleDelete = async () => {
        if (!token) {
            showToast("Error: User not authenticated", "error");
            return;
        }

        try {
            setLoading(true);
            await deleteSongFromPlaylist(playlistId, songId, token);
            showToast("Song removed from playlist", "success");
            onDeleted?.();
        } catch (err) {
            console.error(err);
            showToast(err?.message || "Failed to delete song", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button className={styles.button} onClick={handleDeleteClick} disabled={loading}>
                {loading ? "..." : "X"}
            </button>

            {confirmVisible && (
                <ConfirmModal
                    message="Are you sure you want to remove this song from the playlist?"
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setConfirmVisible(false)}
                />
            )}
        </>
    );
}
