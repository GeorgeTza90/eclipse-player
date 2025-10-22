import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { PlaylistItemProps } from "@/types/playlists";
import DeletePlaylistButton from "../buttons/DeletePlaylistButton";

const PlaylistItem: React.FC<PlaylistItemProps> = ({ playlist, token, onDelete, onPress }) => {

  return (
    <TouchableOpacity style={styles.playlistItem} onPress={() => onPress(playlist)} >
      <Text style={styles.title} numberOfLines={1}>{playlist.title} </Text>
      <Text style={styles.text}> - </Text>
      <Text style={styles.count} numberOfLines={1}> {playlist.songCount ?? 0} songs </Text>      
      <DeletePlaylistButton playlistId={playlist.id} onDeleted={onDelete}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  playlistItem: { marginBottom: 10, padding: 10, backgroundColor: "#222", borderRadius: 6, flexDirection: "row", alignItems: "center", paddingVertical: 8, borderBottomColor: "#333", borderBottomWidth: 1 },
  title: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  count: { color: "#ccc", fontSize: 14 },
  text: { color: "#888"},
  deleteButton: { marginTop: 2, marginLeft: 20, padding: 2,  borderRadius: 6, alignItems: "center" },
  deleteButtonText: { color: "#8b4646ff", fontWeight: "bold", fontSize: 14 }
});

export default PlaylistItem;
