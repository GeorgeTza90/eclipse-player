import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { fetchUserPlaylists } from "@/services/api";
import { Playlist, PlaylistListProps } from "@/types/playlists";
import PlaylistItem from "./PlaylistItem";
import AddPlaylistModal from "./AddPlaylistModal";
import { useRouter } from "expo-router";

const UserPlaylists: React.FC<PlaylistListProps> = ({ token }) => {
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading && <Text style={styles.infoText}>Loading playlists...</Text>}
      {!loading && playlists.length === 0 && <Text style={styles.infoText}>No playlists found.</Text>}

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

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Playlist</Text>
      </TouchableOpacity>

      <AddPlaylistModal visible={modalVisible} token={token} onCreated={loadPlaylists} onClose={() => setModalVisible(false)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 20 },
  infoText: { color: "#aaa", fontSize: 16, marginBottom: 10 },
  addButton: { marginTop: 20, padding: 12, backgroundColor: "#555", borderRadius: 6, alignItems: "center" },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 }
});

export default UserPlaylists;
