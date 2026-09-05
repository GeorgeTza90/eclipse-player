import { useEffect } from "react";
import { setJSON, getJSON } from "@/utils/localStorageManager";
import type { Artist } from "@/types/artists.types";
import type { Song } from "@/types/songs.types";
import type { LibraryFetchProps } from "@/types/library.types";

const tagPrivate = (songs: Song[]): Song[] =>
    songs.map((song) => ({ ...song, isPrivate: true }));

export const useLibraryFetch = ({
    fetchCall, priv_u, setSongs, setArtists, setPrivateSongs, 
    setOriginalSongs, setOriginalArtists, setOriginalPrivateSongs, setLoading,
}: LibraryFetchProps): void => {
    const setLibraryData = ( songsData: Song[], artistsData: Artist[], privateSongsData: Song[] ): void => {
        setSongs(songsData);
        setArtists(artistsData);
        setPrivateSongs(privateSongsData);
        setOriginalSongs(songsData);
        setOriginalArtists(artistsData);
        setOriginalPrivateSongs(privateSongsData);
    };

    useEffect(() => {
        const loadLibrary = async (): Promise<void> => {
            try {
                const [songsData, artistsData] = await Promise.all([ fetchCall("songs"), fetchCall("artists") ]);
                const rawPrivateSongsData: Song[] = priv_u ? await fetchCall("privateSongs").catch(() => []) : [];
                const privateSongsData = tagPrivate(rawPrivateSongsData);
                setLibraryData(songsData, artistsData, privateSongsData);
                setJSON("library/songs", songsData);
                setJSON("library/artists", artistsData);
                setJSON("library/private_songs", privateSongsData);
            } catch {
                const songsData = getJSON<Song[]>("library/songs", []);
                const artistsData = getJSON<Artist[]>("library/artists", []);
                const privateSongsData = priv_u ? tagPrivate(getJSON<Song[]>("library/private_songs", [])) : [];
                setLibraryData(songsData, artistsData, privateSongsData);
            } finally {
                setLoading(false);
            }
        };

        loadLibrary();
    }, [fetchCall, priv_u]);

    useEffect(() => {
        if (!priv_u) {
            localStorage.removeItem("library/private_songs");
            setPrivateSongs([]);
            setOriginalPrivateSongs([]);
        }
    }, [priv_u]);
};