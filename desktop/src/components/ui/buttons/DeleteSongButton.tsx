import React, { useState } from "react";
import { useDeleteManager } from "../../../hooks/useCallManager";
import { useToast } from "../../../contexts/ToastContextWeb";
import ConfirmModal from "../modals/ConfirmModal";
import { getErrorMessage } from "@/utils/getErrorMessage";
import type { DeleteButtonProps } from "@/types/ui.types";
import styles from "./deleteSongButton.module.css";

const DeleteSongButton = ({ playlistId, songId, onDeleted }: DeleteButtonProps) => {    
    const { showToast } = useToast();    
    const [confirmVisible, setConfirmVisible] = useState(false);
    const {loading: deleteLoading, call: deleteCall} = useDeleteManager();
    const loading = deleteLoading?.deleteSongFromPlaylist;

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setConfirmVisible(true);
    };

    const handleConfirmDelete = async () => {
        setConfirmVisible(false);
        await handleDelete();
    };

    const handleDelete = async () => {
        try {            
            await deleteCall("deleteSongFromPlaylist", playlistId, songId);
            showToast("Song removed from playlist", "success");
            onDeleted?.();
        } catch (err) {            
            showToast(getErrorMessage(err, "Failed to delete song"), "error");
        }
    };

    return (
        <>
            <button className={styles.button} onClick={handleDeleteClick} >{loading ? "..." : "X"}</button>

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

export default DeleteSongButton;