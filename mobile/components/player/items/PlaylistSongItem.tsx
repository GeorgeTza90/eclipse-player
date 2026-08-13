import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { PlaylistSongItemProps } from "@/types/songs";
import { groupArtistsByRole } from "@/utils/groupArtistsByRole";

export default function PlaylistSongItem({ item, currentSongId, playlistName, library, onPlay }: PlaylistSongItemProps) {
    const { mainArtists, featArtists } = groupArtistsByRole(item.artists);

    return (
        <TouchableOpacity
            style={[styles.songItem, currentSongId === item.id && styles.activeSongItem]}
            onPress={() => onPlay(item, library, playlistName)}
        >
            <View style={styles.songRow}>
                {item.image && (
                    <Image source={item.image} style={styles.songImage} />
                )}

                <View style={styles.songText}>
                    <Text style={styles.title}>{item.title}</Text>

                    {featArtists.length > 0 && (
                        <Text style={styles.trackFeature}>
                            (feat. {featArtists.join(", ")})
                        </Text>
                    )}

                    <Text style={styles.artist}>{mainArtists.join(", ")}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    songItem: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 15, backgroundColor: "#1e1e1e8d", marginVertical: 5, marginHorizontal: 20 },
    activeSongItem: { backgroundColor: "#414141c9" },
    songRow: { flexDirection: "row", alignItems: "center" },
    songText: { flex: 1, justifyContent: "center" },
    title: { color: "#fff", fontWeight: "bold" },
    trackFeature: { fontSize: 12, color: "#ccc" },
    artist: { color: "#aaa" },
    songImage: { width: 50, height: 50, borderRadius: 8, marginRight: 15 },
});