import React from "react";
import { TouchableOpacity, View, Text,StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Cards } from "@/types/cards";

const { width } = Dimensions.get("window");

export default function CollectionCard({ item, onPress }: Cards) {
  return (
    <TouchableOpacity style={styles.trackContainer} onPress={onPress}>
      {item.image && (
        <Image
          source={{ uri: encodeURI(item.image) }}
          style={styles.albumImage}
          contentFit="cover"
          transition={500}
          cachePolicy="memory-disk"
        />
      )}
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{item.album}</Text>
        <Text style={styles.trackArtist}>{item.artist}</Text>
        <Text style={styles.trackAlbum}>{item.year}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  trackContainer: { width: width * 0.45, height: "82%", marginRight: 15, borderRadius: 12, overflow: "hidden", backgroundColor: "#25252550" },
  albumImage: { alignSelf: "center", width: "90%", height: undefined, aspectRatio: 1, borderRadius: 10, margin: 5 },
  trackInfo: { paddingHorizontal: 5, marginTop: 5 },
  trackTitle: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  trackArtist: { color: "#d6d6d6", fontSize: 14 },
  trackAlbum: { color: "#a0a0a0", fontSize: 12 },
});
