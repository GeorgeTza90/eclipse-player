import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { AddPlaylistButtonProps } from "@/types/buttons";

export default function AddPlaylistButton({ onPress }: AddPlaylistButtonProps) {
  return (
      <TouchableOpacity style={styles.addButton} onPress={onPress}>
          <Text style={styles.addButtonText}>＋ Add Playlist</Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    addButton: { width: "48%", marginBottom: 16, paddingVertical: 20, backgroundColor: "#222", borderRadius: 6, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#333" },  
    addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
