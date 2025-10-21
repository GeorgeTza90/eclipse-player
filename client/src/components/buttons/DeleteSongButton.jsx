import { useState } from "react";
import styles from "./deleteSongButton.module.css";
import { useAuth } from "../../contexts/AuthContextWeb";
import { deleteSongFromPlaylist } from "../../services/DeleteService";

export default function DeleteSongButton({ playlistId, songId, onDeleted }) {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleDelete = async (e) => {
        if (!token) {
            alert("Error: User not authenticated");
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to remove this song from the playlist?"
        );
        if (!confirmed) return;

        try {
            setLoading(true);
            await deleteSongFromPlaylist(playlistId, songId, token);
            onDeleted?.(e);
        } catch (err) {
            console.error(err);
            alert(err?.message || "Failed to delete song");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button className={styles.button} onClick={handleDelete} disabled={loading}>
            {loading ? "..." : "X"}
        </button>
    );
}
