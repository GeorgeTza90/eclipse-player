import React, { useState } from "react";
import { TouchableOpacity, Text, Modal, View, FlatList, StyleSheet, Alert } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { fetchUserPlaylists, addSongToPlaylist } from "@/services/api";
import { Playlist } from "@/types/playlists";
import { AddToPlaylistButtonProps } from "@/types/buttons";

export default function AddToPlaylistButton({ song }: AddToPlaylistButtonProps) {
  const { token } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(false);

  const loadPlaylists = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await fetchUserPlaylists(token); 
      setPlaylists(data);
    } catch (err) {
      console.error("Failed to fetch playlists", err);
      Alert.alert("Error", "Could not load playlists");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToPlaylist = async (playlistId: number) => {
    if (!token) return;
    try {        
      await addSongToPlaylist( playlistId, Number(song.id), token);
      Alert.alert("Success", `Added "${song.title}" to playlist`);
      setModalVisible(false);
    } catch (err) {
      console.error("Failed to add song to playlist", err);
      Alert.alert("Error", "Could not add song");
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={() => { loadPlaylists(); setModalVisible(true); }}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add "{song.title}" to playlist</Text>
            {loading ? (
              <Text style={{ color: "#fff", marginTop: 10 }}>Loading playlists...</Text>
            ) : (
              <FlatList
                data={playlists}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.playlistItem} onPress={() => handleAddToPlaylist(item.id)}>
                    <Text style={styles.playlistTitle}>{item.title}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: { borderRadius: 6, alignItems: "center"},
  buttonText: { color: "#e7ffeaff", fontWeight: "bold", fontSize: 20 },
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: "80%", backgroundColor: "#333", padding: 20, borderRadius: 8, maxHeight: "70%" },
  modalTitle: { color: "#fff", fontWeight: "bold", fontSize: 16, marginBottom: 10 },
  playlistItem: { padding: 10, backgroundColor: "#222", borderRadius: 6, marginBottom: 6 },
  playlistTitle: { color: "#fff" },
  cancel: { backgroundColor: "#999", marginTop: 10 },
});
