import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { PlaylistItemProps } from "@/types/playlists";
import DeletePlaylistButton from "../buttons/DeletePlaylistButton";

export default function PlaylistItem({ playlist, onDelete, onPress }: PlaylistItemProps) {    
    return (
        <TouchableOpacity
            style={styles.playlistItem}
            onPress={() => onPress(playlist)}
        >
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>{playlist.title}</Text>
                <Text style={styles.count}>{playlist.songCount ?? 0} songs</Text>
            </View>

            <DeletePlaylistButton playlistId={playlist.id} onDeleted={onDelete}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
        playlistItem: { 
            width: "48%", marginBottom: 16, padding: 12, backgroundColor: "#222", borderRadius: 6, 
            flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomColor: "#333", borderBottomWidth: 1
        },
        textContainer: { flex: 1, marginRight: 8 },
        title: { color: "#fff", fontSize: 16, fontWeight: "bold" },
        count: { color: "#aaa", fontSize: 14, marginTop: 4 },
});