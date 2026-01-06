import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';

type Song = {
  title: string;
  lyrics?: string;
};

type LyricsProps = {
  currentSong: Song | null;
};

const { width, height } = Dimensions.get('window');

export default function Lyrics({ currentSong }: LyricsProps) {
  if (!currentSong) {
    return (
      <View style={styles.noSongContainer}>
        <Text style={styles.noSongText}>No Song Selected</Text>
      </View>
    );
  }

  const lyricsLines = currentSong.lyrics?.split('\n') || [];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>{currentSong.title} - Lyrics</Text>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator
      >
        {lyricsLines.length > 0 ? (
          lyricsLines.map((line, i) => (
            <Text key={i} style={styles.lyrics}>
              {line || '\u00A0'}
            </Text>
          ))
        ) : (
          <Text style={styles.lyrics}>No Lyrics Yet</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, width: '100%', maxWidth: width * 0.9, paddingHorizontal: 10, alignItems: 'center' },
  heading: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  scrollContainer: { width: '100%', maxHeight: height * 0.5 },
  scrollContent: { alignItems: 'center', paddingVertical: 10 },
  lyrics: { width: '100%', textAlign: 'center', color: '#fff', lineHeight: 20, marginBottom: 4, flexWrap: 'wrap' },
  noSongContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  noSongText: { color: '#fff', fontSize: 16 },
});
