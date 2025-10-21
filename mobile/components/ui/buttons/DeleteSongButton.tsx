import React, { useState } from "react";
import { Alert, Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { deleteSongFromPlaylist as apiDeleteSong } from "@/services/api";
import { DeleteSongButtonProps } from "@/types/buttons";

export default function DeleteSongButton({ playlistId, songId, onDeleted }: DeleteSongButtonProps) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    if (!token) return Alert.alert("Error", "User not authenticated");

    Alert.alert(
      "Delete Song",
      "Are you sure you want to remove this song from the playlist?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await apiDeleteSong(playlistId, songId, token);
              onDeleted?.();
            } catch (err: any) {
              console.error(err);
              Alert.alert("Error", err.message || "Failed to delete song");
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  return (
    <Pressable onPress={handleDelete} style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.buttonText}>X</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginLeft: 2 },
  buttonText: { color: "#8b4646ff", fontWeight: "bold", fontSize: 15 },
});
