import { View, Text, ScrollView, StyleSheet, Dimensions, Pressable, Image } from 'react-native';
import { useAudio } from '@/contexts/AudioContext';
import { useLyricsToast } from '../ui/toasts/LyricsToast';

const { width, height } = Dimensions.get('window');

export default function Lyrics() {
    const { currentSong } = useAudio();
    const { showLyricsToast, LyricsToastUI } = useLyricsToast(currentSong?.lyrics || "")

    if (!currentSong) {
        return (
            <View style={styles.noSongContainer}>
                <Text style={styles.noSongText}>No Song Selected</Text>
            </View>
        );
    }

    const lyricsLines = currentSong.lyrics?.split('\n') || [];

    return (<>
        <View style={styles.container}>
            <View style={styles.headingDiv}>
                <Text style={styles.heading}>{currentSong.title} - Lyrics </Text>
                <Pressable onPress={() => showLyricsToast()}>
                    <Image
                        source={require('@/assets/icons/magnify.png')}
                        style={styles.magnifyButton}
                    />
                </Pressable>
            </View>            
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
        {LyricsToastUI}
    </>);
}

const styles = StyleSheet.create({
    container: { position: "absolute", marginTop: 520,width: width, height: height * 0.365 },
    headingDiv: { flexDirection: "row", justifyContent: "center", },
    heading: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    magnifyButton: { width: 25, height: 25, marginLeft: 15, opacity: 0.5 },
    scrollContainer: { width: '100%', maxHeight: height * 0.5 },
    scrollContent: { alignItems: 'center', paddingVertical: 10 },
    lyrics: { width: '100%', textAlign: 'center', color: '#fff', fontSize: 14, lineHeight: 20, marginBottom: 4, flexWrap: 'wrap' },
    noSongContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    noSongText: { color: '#fff', fontSize: 16 },
});
