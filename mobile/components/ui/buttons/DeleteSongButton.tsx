import { Alert, Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useDeleteManager } from "@/hooks/useCallManager";
import { DeleteSongButtonProps } from "@/types/buttons";
import { useToast } from "@/contexts/ToastContext";

export default function DeleteSongButton({ playlistId, songId, onDeleted }: DeleteSongButtonProps) {    
    const {showToast} = useToast();
    const { loading: deleteLoading, call: deleteCall } = useDeleteManager();
    const loading = deleteLoading?.deletePlaylist;

    const handleDelete = () => {   
        Alert.alert(
            "Delete Song",
            "Are you sure you want to remove this song from the playlist?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: async () => {
                        try {                
                            await deleteCall("deleteSongFromPlaylist", playlistId, songId);
                            onDeleted?.();
                        } catch (err: any) {
                            console.error(err);
                            showToast("Failed to delete song", "error");
                        }
                    }
                }
            ]
        );
    };

    return (
        <Pressable onPress={handleDelete} style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}>
            {loading ? (<ActivityIndicator size="small" color="#fff" />) : (<Text style={styles.buttonText}>X</Text>)}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginLeft: 2 },
    buttonText: { color: "#8b4646ff", fontWeight: "bold", fontSize: 15 },
});
