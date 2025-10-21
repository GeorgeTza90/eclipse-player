import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { fetchSongs } from "@/services/api";
import { preloadImages } from "@/utils/preloadImages";
import { useLibrary } from "@/contexts/LibraryContext";
import { Song } from "@/types/songs";
import CollectionCard from "@/components/ui/library/CollectionCard";

const { width } = Dimensions.get("window");

export default function LibraryScreen() {
  const router = useRouter();
  const { songs, setSongs } = useLibrary();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSongsAndImages = async () => {
      try {        
        const data = await fetchSongs();
        await preloadImages(data.map((song) => song.image));
        setSongs(data);        
      } catch (err) {
        console.warn("Error loading songs or images:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSongsAndImages();
  }, []);  

  const singlesEpsMap = new Map<string, Song>();
    songs.forEach((s) => {
      if ((s.type === "single" || s.type === "ep") && !singlesEpsMap.has(s.album)) {
        singlesEpsMap.set(s.album, s);
      }
    });
  const singlesEps = Array.from(singlesEpsMap.values());
  
  const albumsMap = new Map<string, Song>();
    songs.forEach((s) => {
      if (s.type === "album" && !albumsMap.has(s.album)) {
        albumsMap.set(s.album, s);
      }
    });
    const albums = Array.from(albumsMap.values());


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: "#fff", marginTop: 10 }}>Loading library...</Text>
      </View>
    );
  }

  return (
    <View style={{ paddingHorizontal: 10 }}>
      {/* Singles & EPs */}
      <Text style={styles.categoryTitle}>Singles & EPs</Text>
      <FlatList
        data={singlesEps}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CollectionCard          
            item={item}
            onPress={() => router.push(`/library/CollectionDetail?album=${item.album}`)}
          />
        )}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={false}
      />

      {/* Albums */}
      <Text style={styles.categoryTitle}>Albums</Text>
      <FlatList
        data={albums}
        keyExtractor={(item) => item.album}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CollectionCard
            item={item}
            onPress={() => router.push(`/library/CollectionDetail?album=${item.album}`)}
          />
        )}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoryTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 10, marginTop: 20 },
  trackContainer: { width: width * 0.45, height: "82%", marginRight: 15, borderRadius: 12, overflow: "hidden", backgroundColor: "#25252550" },
  albumImage: { alignSelf: "center", width: "90%", height: undefined, aspectRatio: 1, borderRadius: 10, margin: 5 },
  trackInfo: { paddingHorizontal: 5, marginTop: 5 },
  trackTitle: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  trackArtist: { color: "#d6d6d6", fontSize: 14 },
  trackAlbum: { color: "#a0a0a0", fontSize: 12 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
