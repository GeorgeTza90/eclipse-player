import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { fetchPlaylistSongs, moveSongInPlaylist } from "@/services/api";
import { useAudio } from "@/contexts/AudioContext";
import { useAuth } from "@/contexts/AuthContext";
import { Song, PlaylistSong } from "@/types/songs";
import { SongRow } from "./PlaylistSongItem";
import { useToast } from "@/contexts/ToastContext";

export default function PlaylistDetail() {
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();
  const { token } = useAuth();
  const [songs, setSongs] = useState<PlaylistSong[]>([]);
  const [loading, setLoading] = useState(true);
  const [trash, setTrash] =useState(false);
  const router = useRouter();
  const { playSong } = useAudio();
  const { showToast } = useToast();

  const loadSongs = async () => {
    if (!token) return;
    try {
      const data = await fetchPlaylistSongs(token, Number(id));
      setSongs(data);
    } catch (err) {
      console.error("Failed to load playlist songs", err);
      showToast("Failed to load playlist songs", "error");
    } finally {
      setLoading(false);
    }
  };    

  const handlePlay = (song: Song) => {
    try {
      playSong(song, songs, title); 
      router.push("/player");
    } catch (err: any) {
      showToast("Could not play song", "error");
    }
  }; 
  
  const handleDragEnd = async ({ data, from, to }: { data: PlaylistSong[]; from: number; to: number }) => {        
    const previous = songs.slice();
    setSongs(data);
    if (!token) return;

    try {      
      const movedSong = data[to];      
      await moveSongInPlaylist(Number(id), Number(movedSong.playlistSongId), to, token);      
    } catch (err: any) {
      console.error("Failed to move song", err);      
      setSongs(previous);
      showToast("Failed to move song. Order reverted.", "error");
    }
  };

  const renderItem = ({ item, drag, isActive, getIndex }: RenderItemParams<PlaylistSong>) => (
    <SongRow
      item={item}
      drag={drag}
      isActive={isActive}
      getIndex={getIndex}
      onPlay={handlePlay}
      onDelete={(songId) => setSongs(prev => prev.filter(s => s.id !== songId))}
      playlistId={Number(id)}
    />
  );  

  useEffect(() => {
    loadSongs();
  }, [id, token]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.playlistTitle}>{title}</Text>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: "#aaa", marginTop: 10 }}>Loading songs...</Text>
        </View>
      ) : songs.length === 0 ? (
        <View style={styles.centered}>
          <Text style={{ color: "#aaa" }}>No songs in this playlist yet.</Text>
        </View>
      ) : (
        <DraggableFlatList
          data={songs}          
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          onDragBegin={() => setTrash(true)}
          onDragEnd={handleDragEnd}
          activationDistance={10}
          dragItemOverflow={false}
          animationConfig={{ duration: 150 }}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}     
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 10, marginTop: "10%" },
  playlistTitle: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  text: { color: "#888" },
  songRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8, borderBottomColor: "#333", borderBottomWidth: 1 },
  songIndex: { color: "#888", width: 20 },
  songTitle: { color: "#fff", flex: 0 },
  songArtist: { color: "#a49f9fff", flex: 0 },
  songAlbum: { color: "#656262ff", flex: 1 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  trackDuration: { color: "#888", width: 50, textAlign: "right" },  
});
