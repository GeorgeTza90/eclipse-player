import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import TextTicker from "react-native-text-ticker";
import { SongRowProps } from "@/types/songs";
import DeleteSongButton from "../buttons/DeleteSongButton";
import { Image } from "expo-image";

export const SongRow: React.FC<SongRowProps> = ({ item, isActive, playlistId, getIndex, drag, onPlay,onDelete }) => {
  const index = getIndex?.() ?? 0;

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
      <Text style={styles.songTitle} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
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
          {`${item.artist} - ${item.album}`}
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
  songRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8, borderBottomColor: "#333", borderBottomWidth: 1 },
  text: { color: "#888" },
  songTitle: { color: "#fff", flex: 0 },
  songIndex: { color: "#888", width: 18 },
  songImage: { width: 35, height: 35, borderRadius: 8, marginRight: 15 },
  tickerContainer: { flex: 1, overflow: "hidden", justifyContent: "center" },
  tickerText: { color: "#928989ff", fontSize: 12 },
  trackDuration: { color: "#888", width: 30, textAlign: "right" },
});
