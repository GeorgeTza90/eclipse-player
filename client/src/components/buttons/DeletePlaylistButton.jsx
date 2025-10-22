import { useState } from "react";
import { useAuth } from "../../contexts/AuthContextWeb";
import { deletePlaylist } from "../../services/DeleteService";
import { useToast } from "../../contexts/ToastContextWeb";
import ConfirmModal from "../ui/ConfirmModal";
import styles from "./deletePlaylistButton.module.css";

export default function DeletePlaylistButton({ playlistId, onDeleted }) {
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
      await deletePlaylist(playlistId, token);
      showToast("Playlist deleted successfully", "success");
      onDeleted?.();
    } catch (err) {
      console.error(err);
      showToast(err.message || "Failed to delete playlist", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className={styles.deleteButton}
        onClick={handleDeleteClick}
        disabled={loading}
      >
        {loading ? <span className={styles.spinner}></span> : <span className={styles.deleteText}>X</span>}
      </button>

      {confirmVisible && (
        <ConfirmModal
          message="Are you sure you want to delete this playlist?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmVisible(false)}
        />
      )}
    </>
  );
}
