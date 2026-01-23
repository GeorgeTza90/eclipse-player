import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, View, Dimensions } from "react-native";
import { fetchUserPlaylists } from "@/services/api";
import { Playlist, PlaylistListProps } from "@/types/playlists";
import PlaylistItem from "./PlaylistItem";
import AddPlaylistModal from "./AddPlaylistModal";
import { useRouter } from "expo-router";
import AddPlaylistButton from "../buttons/AddPlaylistButton";

export default function UserPlaylists({ token }: PlaylistListProps) {
    const router = useRouter();
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        loadPlaylists();
    }, []);

    const loadPlaylists = async () => {
        setLoading(true);
        try {
            const data = await fetchUserPlaylists(token);
            setPlaylists(data);
        } catch (err: any) {
            console.log("Failed to load playlists:", err);
        } finally {
            setLoading(false);
        }
  };  

    const scrollHeight = Dimensions.get('window').height * 0.5;
  
  return (
    <View style={{ height: scrollHeight }}>
        <ScrollView contentContainerStyle={styles.container}>
            {loading && <Text style={styles.infoText}>Loading playlists...</Text>}
            {!loading && playlists.length === 0 && <Text style={styles.infoText}>No playlists found.</Text>}

            <View style={styles.gridContainer}>
                {!loading && playlists.map(pl => (
                    <PlaylistItem
                        key={pl.id}
                        playlist={pl}
                        token={token}
                        onDelete={loadPlaylists}
                        onPress={(playlist) =>
                          router.push(`/library/PlaylistDetail?id=${playlist.id}&title=${encodeURIComponent(playlist.title)}`)
                        }
                    />
                ))}

                <AddPlaylistButton onPress={() => setModalVisible(true)} />      
            </View>

            <AddPlaylistModal 
                visible={modalVisible} 
                token={token} 
                onCreated={loadPlaylists} 
                onClose={() => setModalVisible(false)} 
            />
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { padding: 10 },
    infoText: { color: "#aaa", fontSize: 16, marginBottom: 10 },
    gridContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 50 },
    addButton: { marginTop: 20, padding: 12, backgroundColor: "#555", borderRadius: 6, alignItems: "center" },
    addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 }
});