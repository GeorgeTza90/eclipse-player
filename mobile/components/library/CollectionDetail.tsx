import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useAudio } from "@/contexts/AudioContext";
import { useLibrary } from "@/contexts/LibraryContext";
import { useAlbumDuration } from "@/hooks/useFormatTime";
import { Song } from "@/types/songs";
import { useImageToast } from "../ui/toasts/ImageToast";
import { groupArtistsByRole } from "@/utils/groupArtistsByRole";
import TrackItem from "./TrackItem";

const { width } = Dimensions.get("window");

export default function CollectionDetail() {
    const { showImageToast, ImageToastUI } = useImageToast();
    const { user } = useAuth();
    const { album } = useLocalSearchParams<{ album: string }>();
    const { songs } = useLibrary();
    const albumSongs: Song[] = songs.filter(s => s.album === album);
    const { playSong } = useAudio();
    const router = useRouter();  
    const durationString = useAlbumDuration(albumSongs);
    
    if (!albumSongs || !albumSongs.length) { return <Text style={{ color: "#fff", padding: 10 }}>No collection data</Text>; }

    const albumInfo = albumSongs[0];
    const { mainArtists } = groupArtistsByRole(albumInfo.artists);    
    
    const handlePressSong = (song: Song) => {    
        playSong(song, albumSongs, albumInfo.album);
        router.push("/player");
    };
    
    const handlePressArtist = (artist: string) => router.push(`/library/ArtistInfo?artist=${encodeURIComponent(artist)}`)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {albumInfo.image && (
                    <TouchableOpacity onPress={() => showImageToast(albumInfo.imageHQ)} >
                        <Image source={albumInfo.image} style={styles.albumImage} contentFit="cover" />
                    </TouchableOpacity>             
                )}
                <View style={styles.headerInfo}>
                    <Text style={styles.type}>{albumInfo.type.toUpperCase()}</Text>
                    <Text style={styles.albumName}>{albumInfo.album}</Text>
                    <View style={styles.infoRow}>
                        {mainArtists.map((artist) => (
                        <View key={artist} style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => handlePressArtist(artist)}>
                                <Text style={styles.artistInfo}>{artist}</Text>
                            </TouchableOpacity>

                            <Text style={styles.albumInfo}> • </Text>
                        </View>
                        ))}     
                        <Text style={styles.albumInfo}>
                            {albumSongs.length} songs • {durationString}
                        </Text>
                    </View>          
                </View>
            </View>

            <FlatList
                data={albumSongs}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <TrackItem
                        key={index}
                        item={item}
                        index={index}
                        user={user}                        
                        onPressSong={handlePressSong}
                    />
                )}
            />
            {ImageToastUI}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000", padding: 10, marginTop: '10%' },
    header: { flexDirection: "row", marginBottom: 20 },
    albumImage: { width: width * 0.35, height: width * 0.35, borderRadius: 10 },
    headerInfo: { flex: 1, marginLeft: 15, justifyContent: "center" },
    type: { color: "#888", fontSize: 12, marginBottom: 5 },
    albumName: { color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 5 },
    infoRow: {flexDirection: "row"},
    artistInfo: { color: "#d6d6d6", fontSize: 16, marginBottom: 10 },
    albumInfo: { color: "#d6d6d6", fontSize: 14, marginTop: 3 },
    track: { flexDirection: "row", alignItems: "center", paddingVertical: 5, borderBottomColor: "#333", borderBottomWidth: 1, minHeight: 50 },
    trackFeature: { fontSize: 12, color: "#ccc", top: -5  },
    trackInfo: { flex: 1, flexDirection: "row" },
    trackNumber: { color: "#888", width: 25 },
    trackTitle: { color: "#fff", flex: 1 },
    addButtonWrapper: { marginHorizontal: 10 },
    trackDuration: { color: "#888", width: 50, textAlign: "right" },
});
