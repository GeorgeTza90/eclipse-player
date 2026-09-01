import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { getSongData } from '@/utils/getSong';
import { useAudio } from '@/contexts/AudioContext';
import { TopSongsListProps } from '@/types/stats';

const TopSongsList = ({ topSongs }: TopSongsListProps) => {
    const { library, playSong } = useAudio();

    const handlePlaySong = (songId: number) => {
        const song = getSongData(songId, library);
        const newPlaylist = song ? [song] : library;
        song && playSong(song, newPlaylist);
    };

    return (
        <View style={styles.list}>
            {topSongs.map((song, i) => {
                const songData = getSongData(song.song_id, library);
                return (
                    <Pressable
                        key={song.song_id}
                        style={styles.item}
                        onPress={() => handlePlaySong(song.song_id)}
                    >
                        <Text style={styles.rank}>{i + 1}.</Text>
                        {songData?.image && (
                            <Image source={{ uri: songData.image }} style={styles.image} />
                        )}
                        <View style={styles.info}>
                            <Text style={styles.title} numberOfLines={1}>
                                {songData?.title ?? `Song #${song.song_id}`}
                            </Text>
                            {songData?.artist && (
                                <Text style={styles.artist} numberOfLines={1}>{songData.artist}</Text>
                            )}
                        </View>
                        <Text style={styles.playCount}>{song.playCount} plays</Text>
                    </Pressable>
                );
            })}
        </View>
    );
};

export default TopSongsList;

const styles = StyleSheet.create({
    list: { marginTop: 4 },
    item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, gap: 8 },
    rank: { color: '#c9c9c9', fontWeight: 'bold', minWidth: 18, fontSize: 13 },
    image: { width: 36, height: 36, borderRadius: 4 },
    info: { flex: 1 },
    title: { color: '#f7f7f7', fontSize: 14 },
    artist: { color: '#9e9e9e', fontSize: 12 },
    playCount: { color: '#9e9e9e', fontSize: 12 },
});