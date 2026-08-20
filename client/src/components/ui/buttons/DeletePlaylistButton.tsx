import { MouseEvent, useState } from "react";
import { useDeleteManager } from "@/hooks/useCallManager";
import { useToast } from "@/contexts/ToastContextWeb";
import { logger } from "@/utils/logger";
import ConfirmModal from "@/components/ui/modals/ConfirmModal";
import { getErrorMessage } from "@/utils/getErrorMessage";
import type { DeleteButtonProps } from "@/types/ui.types";
import styles from "./deletePlaylistButton.module.css";

const DeletePlaylistButton = ({ playlistId, onDeleted }: DeleteButtonProps) => {    
    const { showToast } = useToast();
    const [confirmVisible, setConfirmVisible] = useState(false);

    const { loading: deleteLoading, call: deleteCall } = useDeleteManager();
    const loading = deleteLoading?.deletePlaylist;

    const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {        
        e.stopPropagation();
        setConfirmVisible(true);
    };

    const handleConfirmDelete = async () => {
        setConfirmVisible(false);
        await handleDelete();
    };

    const handleDelete = async () => {
        try {                        
            await deleteCall("deletePlaylist", playlistId);            
            showToast("Playlist deleted successfully", "success");
            onDeleted?.();
        } catch (err) {
            logger.error("Failed to delete playlist", { error: getErrorMessage(err, "Failed to delete playlist")});            
            showToast(getErrorMessage(err, "Failed to delete playlist"), "error")
        }
    };

    return (<>
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
    </>);
}

export default DeletePlaylistButton;