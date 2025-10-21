import React, { useState } from "react";
import "./DeletePlaylistButton.css";
import { useAuth } from "../../contexts/AuthContextWeb";
import { deletePlaylist } from "../../services/DeleteService";

export default function DeletePlaylistButton({ playlistId, onDeleted }) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!token) {
      alert("Error: User not authenticated");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this playlist?");
    if (!confirmed) return;

    try {
      setLoading(true);
      await deletePlaylist(playlistId, token);
      onDeleted?.();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to delete playlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="delete-button" onClick={(e) => {
      e.stopPropagation();
      handleDelete();
    }

    } disabled={loading}>
      {loading ? <span className="spinner"></span> : <span className="delete-text">X</span>}
    </button>
  );
}
