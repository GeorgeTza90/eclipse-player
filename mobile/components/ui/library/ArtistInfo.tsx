import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useLibrary } from "../../../contexts/LibraryContext";
import { fetchArtist } from "../../../services/api";
import { byYear } from "../../../utils/songsCetegorizer";
import LibraryGroupItem from "./LibraryGroupItem";

export default function ArtistDetail() {
  const [artist, setArtist] = useState<any>(null);
  const [groupsKind, setGroupKind] = useState<"Singles & EPs" | "Albums" | "Artists">("Singles & EPs");
  const { artist: artistName } = useLocalSearchParams();
  const { songs } = useLibrary();
  const router = useRouter();

  useEffect(() => {
    const loadArtist = async () => {
      if (!artistName) return;
      try {
        const data = await fetchArtist(artistName as string);
        setArtist(data);
      } catch (err) {
        console.error(err);
        router.push("/library");
      }
    };
    loadArtist();
  }, [artistName]);

  if (!artist)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading artist...</Text>
      </View>
    );

  const artistSongs = songs.filter((s: any) => s.artist === artist.name);
  const singlesEps = byYear(songs, "single", "ep");
  const albums = byYear(songs, "album");

  const openLink = (url?: string) => {
    if (url) Linking.openURL(url).catch((err) => console.error("Failed to open link", err));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 10 }}>      
        <View style={styles.headerInfo}>
            {artist.image_url && (
            <Image source={{ uri: encodeURI(artist.image_url) }} style={styles.artistImage} />
            )}
        
          <Text style={styles.artistName}>{artist.name}</Text>
          <Text style={styles.artistInfo}>{artist.description}</Text>

          <View style={styles.contactRow}>
            <TouchableOpacity onPress={() => openLink(artist.media?.instagram)}>
                <Image style={styles.contactIcon} source={require("@/assets/icons/instagram.png")}/>                
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink(artist.media?.facebook)}>
                <Image style={styles.contactIcon} source={require("@/assets/icons/facebook.png")}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink(artist.media?.youtube)}>
                <Image style={styles.contactIcon} source={require("@/assets/icons/youtube.png")}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink(artist.media?.twitter)}>
                <Image style={styles.contactIcon} source={require("@/assets/icons/twitter.png")}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink(artist.media?.mail)}>
                <Image style={styles.contactIcon} source={require("@/assets/icons/mail.png")}/>
            </TouchableOpacity>
          </View>        
      </View>

      {artistSongs.length > 0 ? (
        <View style={styles.songsContainer}>            
            <View style={styles.toggleRow}>
                <TouchableOpacity
                    style={[ styles.toggleButton, groupsKind === "Singles & EPs" && styles.toggleButtonActive ]}
                    onPress={() => setGroupKind("Singles & EPs")}
                >
                <Text style={styles.toggleText}>Singles & EPs</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[ styles.toggleButton, groupsKind === "Albums" && styles.toggleButtonActive ]}
                    onPress={() => setGroupKind("Albums")}
                >
                <Text style={styles.toggleText}>Albums</Text>
                </TouchableOpacity>
            </View>

              <LibraryGroupItem type={groupsKind} group={groupsKind === "Albums" ? albums : singlesEps} title={false}/>
        </View>
      ) : (
        <Text style={styles.noSongs}>No songs for this artist.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000", marginTop: 50 },
    loadingText: { marginTop: 32, padding: 2, marginLeft: 0 },    
    artistImage: { width: 120, height: 120, borderRadius: 12 },
    headerInfo: { flex: 1, marginLeft: 15, justifyContent: 'center' },
    artistName: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
    artistInfo: { color: '#d6d6d6', fontSize: 14 },
    contactRow: { flexDirection: "row", marginTop: 10, gap: 12 },
    contactIcon: { width: 35, height: 35, marginHorizontal: 5, marginVertical: 5, opacity: 0.5 },
    songsContainer: { marginTop: 50 },
    toggleRow: { flexDirection: "row", justifyContent: "center", marginBottom: 16, gap: 8 },
    toggleButton: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: "#222" },
    toggleButtonActive: { backgroundColor: "#444" },
    toggleText: { color: "#fff" }, 
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    noSongs: { color: "#fff", textAlign: "center", marginVertical: 20 },
});
