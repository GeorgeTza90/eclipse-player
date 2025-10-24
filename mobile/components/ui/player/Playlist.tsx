// components/ui/player/Playlist.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image'
import { useAudio } from '@/contexts/AudioContext';

const { width, height } = Dimensions.get('window');

export default function Playlist({ name = "Playlist" }) {
  const { library, currentSong, playSong } = useAudio();  

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.songItem,
        currentSong?.id === item.id && styles.activeSongItem
      ]}
      onPress={() => playSong(item, library)}
    >
        <View style={styles.songRow}>
          {item.image && <Image source={item.image} style={styles.songImage} />}
          <View style={styles.songText}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.artist}>{item.artist}</Text>
          </View>
        </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{name}</Text>
      <FlatList
        data={library}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: width, height: height * 0.35, marginTop: 120, top: -40 },
  heading: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  list: { flexGrow: 0 },
  listContent: { paddingBottom: 40 },
  songItem: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 15, backgroundColor: '#1e1e1e8d', marginVertical: 5, marginHorizontal: 20 },
  activeSongItem: { backgroundColor: '#414141c9' },
  title: { color: '#fff', fontWeight: 'bold' },
  artist: { color: '#aaa' },
  songRow: {  flexDirection: 'row', alignItems: 'center' },
  songText: { flex: 1, justifyContent: 'center' },
  songImage: { width: 50, height: 50, borderRadius: 8, marginRight: 15 },
});
