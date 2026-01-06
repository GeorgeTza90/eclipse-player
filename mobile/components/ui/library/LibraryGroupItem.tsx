import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import CollectionCard from "../library/CollectionCard";
import { Song } from "@/types/songs";
import { Artist } from "@/types/artists";

type LibraryGroupItemProps = {
  type: "Singles & EPs" | "Albums" | "Artists";
  group: Song[] | Artist[];
  title?: Boolean
};

export default function LibraryGroupItem({ type, group, title= true }: LibraryGroupItemProps) {
  const router = useRouter();
  const isArtist = type === "Artists";

  // Διαχωρίζουμε το group ανά τύπο
  const songsGroup = !isArtist ? (group as Song[]) : [];
  const artistsGroup = isArtist ? (group as Artist[]) : [];

  return (
    <View style={{ height: 225, marginBottom: 10 }}>
      {title && <Text style={styles.categoryTitle}>{type}</Text>}

      {!isArtist && (
        <FlatList
          data={songsGroup}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CollectionCard
              songItem={item}
              onPress={() =>
                router.push(`/library/CollectionDetail?album=${encodeURIComponent(item.album)}`)
              }
            />
          )}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={false}
        />
      )}

      {isArtist && (
        <FlatList
          data={artistsGroup}
          keyExtractor={(item) => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CollectionCard
              artistItem={item}
              onPress={() =>
                router.push(`/library/ArtistInfo?artist=${encodeURIComponent(item.name)}`)
              }
            />
          )}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    marginTop: 10,
  },
});
