import { TouchableOpacity, Text, StyleSheet, View, Dimensions } from "react-native";
import { Image } from "expo-image";
import { SongRowProps } from "@/types/songs";
import TextTicker from "react-native-text-ticker";
import DeleteSongButton from "../ui/buttons/DeleteSongButton";
import { groupArtistsByRole } from "@/utils/groupArtistsByRole";

export default function SongRow({ item, isActive, playlistId, getIndex, drag, onPlay,onDelete }: SongRowProps) {
  const index = getIndex?.() ?? 0;
  const { mainArtists, featArtists} = groupArtistsByRole(item.artists);

  return (
    <TouchableOpacity
        onLongPress={drag}
        onPress={() => onPlay(item)}
        style={[styles.songRow, isActive && { backgroundColor: "#111" }]}
        activeOpacity={0.8}
        delayLongPress={100}
    >
    {/* Index */}
        <Text style={styles.songIndex}>{index + 1}.</Text>

    {/* Image */}
        {item.image && <Image source={item.image} style={styles.songImage} />}
        <View style={styles.titleRow}>
            <Text style={styles.songTitle} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
            {featArtists.length > 0 && (
                <TextTicker 
                    style={styles.tickerText}
                    duration={8000}
                    loop
                    bounce
                    repeatSpacer={50}
                    scrollSpeed={50}
                >(feat. {featArtists.join(", ")})</TextTicker>
            )}      
        </View>      
        <Text style={styles.text}>  -  </Text>

    {/* Scrolling title/artist/album */}
        <View style={styles.tickerContainer}>
            <TextTicker
                style={styles.tickerText}
                duration={8000}
                loop
                bounce
                repeatSpacer={50}
                scrollSpeed={50}
            >
                {`${mainArtists.join(" - ")} - ${item.album}`}
            </TextTicker>
        </View>

    {/* Delete button */}
        <DeleteSongButton
            playlistId={playlistId}
            songId={Number(item.id)}
            onDeleted={() => onDelete(item.id)}
        />

    {/* Duration */}
        {typeof item.duration !== "undefined" && (
            <Text style={styles.trackDuration}>
                {Math.floor(item.duration / 60)}:{("0" + (item.duration % 60)).slice(-2)}
            </Text>
        )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    songRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8, borderBottomColor: "#333", borderBottomWidth: 1, height: 60, width: "100%" },
    text: { color: "#888" },
    titleRow: { width: 160, flexShrink: 0 },
    songTitle: { color: "#fff" },
    trackFeature: { fontSize: 12, color: "#ccc", top: -5  },
    songIndex: { color: "#888", width: 25 },
    songImage: { width: 35, height: 35, borderRadius: 8, marginRight: 15 },
    tickerContainer: { width: Dimensions.get("window").width / 3.5, overflow: "hidden", justifyContent: "center" },
    tickerText: { color: "#928989ff", fontSize: 12 },
    trackDuration: { color: "#888", width: 30, textAlign: "right" },
});
