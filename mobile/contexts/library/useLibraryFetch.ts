import { useEffect } from "react";
import { Song } from "@/types/songs";
import { Artist } from "@/types/artists";
import { getJSON, setJSON } from "@/utils/localStorageManager";
import { UseLibraryFetchProps } from "@/types/library";

export function useLibraryFetch({
    fetchCall, user,
    setSongs, setPrivateSongs, setArtists,
    setOriginalSongs, setOriginalPrivateSongs, setOriginalArtists,
    setLoading,
}: UseLibraryFetchProps) {
    useEffect(() => {
        const loadLibrary = async () => {
            try {
                const [songsData, artistsData] = await Promise.all([
                    fetchCall("songs"),
                    fetchCall("artists"),
                ]);
                const privateSongsData = user ? await fetchCall("privateSongs") : [];

                setSongs(songsData as Song[]);
                setPrivateSongs(privateSongsData as Song[]);
                setArtists(artistsData as Artist[]);

                setOriginalSongs(songsData as Song[]);
                setOriginalPrivateSongs(privateSongsData as Song[]);
                setOriginalArtists(artistsData as Artist[]);

                await setJSON("library/songs", songsData);
                await setJSON("library/privateSongs", privateSongsData);
                await setJSON("library/artists", artistsData);
            } catch (err) {
                console.warn("Failed to load library:", err);

                const cachedSongs = await getJSON<Song[]>("library/songs", []);
                const cachedPrivateSongs = await getJSON<Song[]>("library/privateSongs", []);
                const cachedArtists = await getJSON<Artist[]>("library/artists", []);

                setSongs(cachedSongs);
                setPrivateSongs(cachedPrivateSongs);
                setArtists(cachedArtists);
                setOriginalSongs(cachedSongs);
                setOriginalPrivateSongs(cachedPrivateSongs);
                setOriginalArtists(cachedArtists);
            } finally {
                setLoading(false);
            }
        };

        loadLibrary();
    }, [user]);
}