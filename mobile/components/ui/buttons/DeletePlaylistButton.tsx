import React, { useState } from "react";
import { Alert, Pressable, Text, StyleSheet, ActivityIndicator, View } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { deletePlaylist as apiDeletePlaylist } from "@/services/api";
import { DeletePlaylistButtonProps } from "@/types/buttons";
import { useToast } from "@/contexts/ToastContext";

export default function DeletePlaylistButton({ playlistId, onDeleted }: DeletePlaylistButtonProps) {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const confirmDelete = () => {
        Alert.alert(
            "Delete Playlist",
            "Are you sure you want to delete this playlist?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: handleDelete }
            ]
        );
    };

    const handleDelete = async () => {
        if (!token) {
            showToast("User not authenticated", "error");
            return;
        }

        try {
            setLoading(true);
            await apiDeletePlaylist(playlistId, token);
            showToast("Playlist deleted successfully", "success");
            onDeleted?.();
        } catch (err: any) {
            console.error(err);
            showToast(err?.message || "Failed to delete playlist", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
      <View style={styles.container}>
        <Pressable onPress={confirmDelete} style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}>
          {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>X</Text>}
        </Pressable>
      </View>      
    );
}

const styles = StyleSheet.create({
    container: { marginLeft: "auto" },
    button: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, alignItems: "center" },
    buttonText: { color: "#8b4646ff", fontWeight: "bold", fontSize: 14 },
});
