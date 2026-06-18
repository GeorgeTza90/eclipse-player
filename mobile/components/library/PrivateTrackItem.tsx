import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Song, TrackItemProps } from "@/types/songs";
import AddToPlaylistButton from "../ui/buttons/AddToPlaylistButton";
import { groupArtistsByRole } from "@/utils/groupArtistsByRole";

export default function PrivateTrackItem({ item, index, user, onPressSong }: TrackItemProps) {    
    const { featArtists } = groupArtistsByRole(item.artists);

    return (
        <View style={styles.track}>
            <TouchableOpacity
                style={styles.trackInfo}
                onPress={() => onPressSong(item)}
            >
                <Text style={styles.trackNumber}>{index + 1}.</Text>

                <View>
                    <Text style={styles.trackTitle}>{item.title}</Text>

                    {featArtists.length > 0 && (
                        <Text style={styles.trackFeature}>
                            (feat. {featArtists.join(", ")})
                        </Text>
                    )}
                </View>
            </TouchableOpacity>

            {item.duration && (
                <Text style={styles.trackDuration}>
                    {Math.floor(item.duration / 60)}:
                    {("0" + (item.duration % 60)).slice(-2)}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    track: { flexDirection: "row", alignItems: "center", paddingVertical: 5, borderBottomColor: "#333", borderBottomWidth: 1, minHeight: 50 },
    trackInfo: { flex: 1, flexDirection: "row" },
    trackNumber: { color: "#888", width: 25 },
    trackTitle: { color: "#fff", flex: 1 },
    trackFeature: { fontSize: 12, color: "#ccc" },
    addButtonWrapper: { marginHorizontal: 10 },
    trackDuration: { color: "#888", width: 50, textAlign: "right" },
});