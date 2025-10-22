import React, { useState } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { createPlaylist } from "@/services/api";
import { AddPlaylistModalProps } from "@/types/playlists";
import { useToast } from "@/contexts/ToastContext";

const AddPlaylistModal: React.FC<AddPlaylistModalProps> = ({ visible, onClose, token, onCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { showToast } = useToast();

  const handleCreate = async () => {
    if (!title.trim()) return showToast("Playlist title is required", "error");      
    
    try {
      await createPlaylist(token, title, description);
      showToast(`Playlist "${title}" created successfully`, "success");
      setTitle("");
      setDescription("");
      onCreated();
      onClose();
    } catch (err: any) {
      console.error("Failed to create playlist:", err);
      showToast(err?.message || "Could not create playlist", "error");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TextInput placeholder="Playlist Title" value={title} onChangeText={setTitle} style={styles.input} placeholderTextColor="#aaaaaa50" />
          <TextInput placeholder="Description (optional)" value={description} onChangeText={setDescription} style={styles.input} placeholderTextColor="#aaaaaa50"/>
          <TouchableOpacity style={styles.modalButton} onPress={handleCreate}>
            <Text style={styles.modalButtonText}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.modalCancel]} onPress={onClose}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: "80%", backgroundColor: "#333", padding: 20, borderRadius: 8 },
  input: { backgroundColor: "#222", color: "#fff", padding: 10, marginBottom: 10, borderRadius: 4 },
  modalButton: { padding: 12, backgroundColor: "#555", borderRadius: 6, alignItems: "center", marginBottom: 10 },
  modalButtonText: { color: "#fff", fontWeight: "bold" },
  modalCancel: { backgroundColor: "#999" }
});

export default AddPlaylistModal;
