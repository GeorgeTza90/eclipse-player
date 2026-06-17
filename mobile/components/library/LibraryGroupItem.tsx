import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Song } from "@/types/songs";
import { Artist } from "@/types/artists";
import CollectionCard from "../library/CollectionCard";
import { groupArtistsByRole } from "@/utils/groupArtistsByRole";

type LibraryGroupItemProps = {
    type: "Singles & EPs" | "Albums" | "Artists";
    group: Song[] | Artist[];
    title?: boolean;
};

export default function LibraryGroupItem({ type, group, title= true }: LibraryGroupItemProps) {
    const router = useRouter();
    const isArtist = type === "Artists";  
    const songsGroup = !isArtist ? (group as Song[]) : [];
    const artistsGroup = isArtist ? (group as Artist[]) : [];
    const {} = groupArtistsByRole();

    const handlePress = (item: string, type: string): void => {        
        if (type === "artist") {
            router.push(`/library/ArtistInfo?artist=${encodeURIComponent(item)}`);
        } else {
            router.push(`/library/CollectionDetail?album=${encodeURIComponent(item)}`);
        }
        };

    return (
            <View style={{ height: 225, marginBottom: 10 }}>
                {title && <Text style={styles.categoryTitle}>{type}</Text>}

                {!isArtist && (
                    <FlatList
                        data={songsGroup}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <CollectionCard
                                key={index}
                                songItem={item}
                                onPress={() => handlePress(item.album, "album")}
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
                        renderItem={({ item, index }) => (
                            <CollectionCard
                                key={index}
                                artistItem={item}
                                onPress={() => handlePress(item.name, "artist")}
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
    categoryTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 10, marginTop: 10 },
});
