import { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { useFetchManager, usePostManager } from "@/hooks/useCallManager";
import { useAudio } from "@/contexts/AudioContext";
import { useToast } from "@/contexts/ToastContext";
import { useAlbumDuration } from "@/hooks/useFormatTime";
import { Song, PlaylistSong } from "@/types/songs";
import SongRow from "./PlaylistSongItem";
import EditPlaylistModal from "../ui/modals/EditPlaylistModal";

export default function PlaylistDetail() {
    const params = useLocalSearchParams<{
        id: string;
        title?: string;
        description?: string;
    }>();

    const id = Number(params.id);

    const router = useRouter();
    const { playSong } = useAudio();
    const { showToast } = useToast();

    const { loading: fetchLoading, call: fetchCall } = useFetchManager();
    const { call: postCall } = usePostManager();

    const loading = fetchLoading?.playlistSongs;

    const [songs, setSongs] = useState<PlaylistSong[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    const [playlistTitle, setPlaylistTitle] = useState<string>("");
    const [playlistDescription, setPlaylistDescription] = useState<string>("");

    const durationString = useAlbumDuration(songs);

    /* ---------------- LOAD ---------------- */
    const loadSongs = useCallback(async () => {
        try {
            const res = await fetchCall("playlistSongs", id);
            setSongs(res || []);
        } catch (err) {
            console.error(err);
            showToast("Failed to load playlist songs", "error");
        }
    }, [id, fetchCall, showToast]);

    useEffect(() => { if (!id) return; loadSongs(); }, [id, loadSongs]);

    /* ---------------- INIT PARAM SYNC ---------------- */
    useEffect(() => {
        if (params.title) setPlaylistTitle(String(params.title));
        if (params.description) setPlaylistDescription(String(params.description));
    }, [params.title, params.description]);

    /* ---------------- PLAY ---------------- */
    const handlePlay = (song: Song) => {
        try {
            playSong(song, songs, playlistTitle);
            router.push("/player");
        } catch {
            showToast("Could not play song", "error");
        }
    };

    /* ---------------- DRAG ---------------- */
    const handleDragEnd = async ({ data, to }: any) => {
        if (to == null) return;
        const previous = songs;
        setSongs(data);
        const movedSong = data[to];
        if (!movedSong) return;
        try {
            await postCall( "moveSongInPlaylist", id, Number(movedSong.playlistSongId), to );
        } catch (err) {
            setSongs(previous);
            showToast("Failed to move song. Order reverted.", "error");
        }
    };

    /* ---------------- UPDATE FROM MODAL ---------------- */
    const handlePlaylistUpdate = (newTitle: string, newDescription: string) => {
        setPlaylistTitle(newTitle);
        setPlaylistDescription(newDescription);
        loadSongs();
    };

    /* ---------------- RENDER ITEM ---------------- */
    const renderItem = ({ item, drag, isActive, getIndex }: RenderItemParams<PlaylistSong>) => (
        <SongRow
            item={item}
            drag={drag}
            isActive={isActive}
            getIndex={getIndex}
            onPlay={handlePlay}
            onDelete={(songId) => setSongs(prev => prev.filter(s => s.id !== songId))}
            playlistId={id}
        />
    );

    return (
        <View style={styles.container}>

            <View style={styles.titleDiv}>
                <Text style={styles.playlistTitle}>{playlistTitle}</Text>

                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Image
                        source={require("@/assets/icons/edit.png")}
                        style={{ width: 20, height: 20 }}
                    />
                </TouchableOpacity>
            </View>

            {playlistDescription ? (
                <Text style={styles.playlistDetails}>
                    {playlistDescription}
                </Text>
            ) : null}

            <Text style={styles.playlistDetails}>
                {songs.length} songs • {durationString}
            </Text>

            {loading ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={{ color: "#aaa", marginTop: 10 }}>
                        Loading songs...
                    </Text>
                </View>
            ) : songs.length === 0 ? (
                <View style={styles.centered}>
                    <Text style={{ color: "#aaa" }}>
                        No songs in this playlist yet.
                    </Text>
                </View>
            ) : (
                <DraggableFlatList
                    data={songs}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    onDragEnd={handleDragEnd}
                    activationDistance={10}
                    dragItemOverflow={false}
                    animationConfig={{ duration: 150 }}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            )}

            <EditPlaylistModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onUpdated={handlePlaylistUpdate}
                currentTitle={playlistTitle}
                currentDescription={playlistDescription}
                currentId={id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000", padding: 10, marginTop: "10%" },
    titleDiv: { flexDirection: "row", alignItems: "center", minHeight: 50 },
    playlistTitle: { color: "#fff", fontSize: 25, fontWeight: "bold" },
    editButton: { marginLeft: 20 },
    playlistDetails: { color: "#ffffff8e", fontSize: 18, marginBottom: 10 },
    centered: { flex: 1, justifyContent: "center", alignItems: "center" }
});