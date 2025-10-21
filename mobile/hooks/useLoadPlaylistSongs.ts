import { useLibrary } from "@/contexts/LibraryContext";
import { fetchSongById } from "@/services/api";
import { Song } from "@/types/songs";

export const useLoadPlaylistSongs = () => {
    const { setSongs } = useLibrary();

    const loadPlaylistSongs = async (songIds: number[]): Promise<Song[]> => {
        try {
            const fullSongs = await Promise.all(songIds.map((id) => fetchSongById(id)));
            setSongs(fullSongs);
            return fullSongs;
        } catch (err) {
            console.error("Failed to load playlist songs:", err);
            return [];
        }
    };

    return { loadPlaylistSongs };
};
