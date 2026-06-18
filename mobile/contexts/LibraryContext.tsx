import { createContext, useState, useEffect, useContext, ReactNode, useMemo } from "react";
import { LibraryContextType } from "@/types/library";
import { getJSON, setJSON } from "@/utils/localStorageManager";
import { useFetchManager } from "@/hooks/useCallManager";
import { Song } from "@/types/songs";
import { Artist } from "@/types/artists";
import { useAuth } from "./AuthContext";
import { byYear } from "@/utils/songsCetegorizer";

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {  
    const { call: fetchCall } = useFetchManager();
    const { user } = useAuth();

    const [songs, setSongs] = useState<Song[]>([]);
    const [privateSongs, setPrivateSongs] = useState<Song[]>([])
    const [artists, setArtists] = useState<Artist[]>([]);
    const [originalSongs, setOriginalSongs] = useState<Song[]>([]);
    const [originalPrivateSongs, setOriginalPrivateSongs] = useState<Song[]>([]);
    const [originalArtists, setOriginalArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true);

    /* --- SONGS CATEGORIZER --- */
    const privateAlbums = useMemo(() => byYear(privateSongs, "album"), [songs]);
    const singlesEps = useMemo(() => byYear(songs, "single", "ep"), [songs]);
    const albums = useMemo(() => byYear(songs, "album"), [songs]);    

    /* ---------------- FETCH LIBRARY ---------------- */
    useEffect(() => {
        const loadLibrary = async () => {
            try {
                const [songsData, artistsData] = await Promise.all([ fetchCall("songs"), fetchCall("artists") ]);
                const privateSongsData = user ? await fetchCall("privateSongs") : [];
                setSongs(songsData);
                setPrivateSongs(privateSongsData)
                setArtists(artistsData);

                setOriginalSongs(songsData);
                setOriginalPrivateSongs(privateSongsData);
                setOriginalArtists(artistsData);

                await setJSON("library/songs", songsData);
                await setJSON("library/privateSongs", privateSongsData);
                await setJSON("library/artists", artistsData);
            } catch (err) {
                console.warn("Failed to load library:", err);

                const cachedSongs = await getJSON<Song[]>("library/songs", []);
                const cachedPrivateSongs = await getJSON<Song[]>("library/privateSongs", []);
                const cachedArtists = await getJSON<Artist[]>("library/artists", []);

                setSongs(cachedSongs);
                setPrivateSongs(cachedPrivateSongs)
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

    return (
        <LibraryContext.Provider
            value={{
                songs, privateSongs, artists, originalSongs,
                originalPrivateSongs, originalArtists, loading,
                privateAlbums, singlesEps, albums,
                setSongs, setPrivateSongs, setArtists,setOriginalPrivateSongs,
                setOriginalSongs, setOriginalArtists
            }}
        >
            {children}
        </LibraryContext.Provider>
    );
};

export const useLibrary = () => {
    const context = useContext(LibraryContext);
    if (!context) throw new Error("useLibrary must be used within LibraryProvider");
    return context;
};