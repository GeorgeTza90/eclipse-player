import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ScrollView, Text, StyleSheet, View, Dimensions } from "react-native";
import { useFetchManager } from "@/hooks/useCallManager";
import { useAuth } from "@/contexts/AuthContext";
import PlaylistItem from "./PlaylistItem";
import AddPlaylistModal from "./AddPlaylistModal";
import AddPlaylistButton from "../buttons/AddPlaylistButton";

export default function UserPlaylists() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const { state: fetchState, loading: fetchLoading, call: fetchCall } = useFetchManager();
    const loading = fetchLoading?.playlists;
    const playlists = fetchState?.playlists;

    const [ modalVisible, setModalVisible ] = useState(false);

    useEffect(() => {
        if (authLoading || !user) return;
        loadPlaylists();
    }, [authLoading, user]);

    const loadPlaylists = async () => {        
        try {
            await fetchCall("playlists");
            
        } catch (err: any) {
            console.log("Failed to load playlists:", err);
        }
    };

    const scrollHeight = Dimensions.get('window').height * 0.5;

    return (
        <View style={{ height: scrollHeight }}>
            <ScrollView contentContainerStyle={styles.container}>
                {loading && <Text style={styles.infoText}>Loading playlists...</Text>}
                {!loading && playlists?.length === 0 && <Text style={styles.infoText}>No playlists found.</Text>}

                <View style={styles.gridContainer}>
                    {!loading && playlists?.map(pl => (
                        <PlaylistItem
                            key={pl.id}
                            playlist={pl}
                            onDelete={loadPlaylists}
                            onPress={(playlist) =>
                                router.push({
                                    pathname: "/library/PlaylistDetail",
                                    params: {
                                        id: String(playlist.id),
                                        title: playlist.title,
                                        description: playlist.description ?? "",
                                        songCount: String(playlist.songCount ?? 0),
                                    }
                                })
                            }
                        />
                    ))}

                    <AddPlaylistButton onPress={() => setModalVisible(true)} />
                </View>

                <AddPlaylistModal 
                    visible={modalVisible}
                    onCreated={loadPlaylists}
                    onClose={() => setModalVisible(false)}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 10 },
    infoText: { color: "#aaa", fontSize: 16, marginBottom: 10 },
    gridContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 50 },
    addButton: { marginTop: 20, padding: 12, backgroundColor: "#555", borderRadius: 6, alignItems: "center" },
    addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 }
});