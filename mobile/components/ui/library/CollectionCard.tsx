import React from "react";
import { TouchableOpacity, View, Text,StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Cards } from "@/types/cards";

const { width } = Dimensions.get("window");

export default function CollectionCard({ songItem, artistItem, onPress }: Cards) {
  return (<>
        {songItem && (
          <TouchableOpacity style={styles.trackContainer} onPress={onPress}>
            {songItem.image && (
              <Image
                source={{ uri: encodeURI(songItem.image) }}
                style={styles.albumImage}
                contentFit="cover"
                transition={500}
                cachePolicy="memory-disk"
              />
            )}
            <View style={styles.trackInfo}>
              <Text style={styles.trackTitle}>{songItem.album}</Text>
              <Text style={styles.trackArtist}>{songItem.artist}</Text>
              <Text style={styles.trackAlbum}>{songItem.year}</Text>
            </View>
          </TouchableOpacity>
        )}

        {artistItem && (
            <TouchableOpacity style={styles.artistContainer} onPress={onPress}>
            {artistItem.image_url && (
              <Image
                source={{ uri: encodeURI(artistItem.image_url) }}
                style={styles.artistImage}
                contentFit="cover"
                transition={500}
                cachePolicy="memory-disk"
              />
            )}
            <View style={styles.trackInfo}>
              <Text style={styles.artistName}>{artistItem.name}</Text>                   
            </View>
          </TouchableOpacity>
        )}
  </>);
}

const styles = StyleSheet.create({
  
  trackContainer: { width: width * 0.25, height: 170, marginRight: 8, marginBottom: -40, borderRadius: 12, overflow: "hidden", backgroundColor: "#25252550", justifyContent: "flex-start", alignItems: "center", padding: 1},
  artistContainer: { width: width * 0.2, height: 120, marginRight: 12, borderRadius: 12, overflow: "hidden", backgroundColor: "transparent", justifyContent: "flex-start", alignItems: "center", padding: 10 },
  albumImage: { alignSelf: "center", width: "84%", height: undefined, aspectRatio: 1, borderRadius: 8, margin: 2 },
  artistImage: { alignSelf: "center", width: "130%", height: undefined, aspectRatio: 1, borderRadius: 50, margin: 2 },
  trackInfo: { paddingHorizontal: 5, marginTop: 4 },
  trackTitle: { color: "#fff", fontWeight: "bold", fontSize: 12.7 },
  trackArtist: { color: "#d6d6d6", fontSize: 12 },
  trackAlbum: { color: "#a0a0a0", fontSize: 11 },
  artistName: { color: "#ffffff8f", fontWeight: "bold", fontSize: 10.5 },
});
