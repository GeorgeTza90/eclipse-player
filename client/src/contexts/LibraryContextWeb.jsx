import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { useFetchManager } from "../hooks/useCallManager";
import { setJSON, getJSON, getBool, setBool } from "../utils/localStorageManager";
import { byYear } from "../utils/songsCetegorizer";
import { useAuth } from "./AuthContextWeb";

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
    const { call: fetchCall } = useFetchManager();
    const { user, priv_u } = useAuth();

    const [originalSongs, setOriginalSongs] = useState([]);
    const [originalPrivateSongs, setOriginalPrivateSongs] = useState([]);
    const [originalArtists, setOriginalArtists] = useState([]);
    const [songs, setSongs] = useState([]);
    const [privateSongs, setPrivateSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [vinyl, setVinyl] = useState(() => getBool("library_vinylMode", false));

    const setLibraryData = (songsData, artistsData, privateSongsData) => {
        setSongs(songsData);
        setArtists(artistsData);
        setPrivateSongs(privateSongsData);
        setOriginalSongs(songsData);
        setOriginalArtists(artistsData);
        setOriginalPrivateSongs(privateSongsData);
    };

    /* --- LOCAL STORAGE --- */
    useEffect(() => setBool("library_vinylMode", vinyl), [vinyl])

    /* --- SONGS CATEGORIZER --- */
    const privateAlbums = useMemo(() => byYear(privateSongs, "album"), [privateSongs]);
    const singlesEps = useMemo(() => byYear(songs, "single", "ep"), [songs]);
    const albums = useMemo(() => byYear(songs, "album"), [songs]);        

    /* --- FETCH SONGS --- */
    useEffect(() => {
        (async () => {
            try {                
                const [songsData, artistsData] = await Promise.all([ fetchCall("songs"), fetchCall("artists")]);
                const privateSongsData = priv_u
                    ? await fetchCall("privateSongs").catch(() => [])
                    : [];
                setLibraryData(songsData, artistsData, privateSongsData);
                setJSON("library/songs", songsData);
                setJSON("library/artists", artistsData);
                setJSON("library/private_songs", privateSongsData);
            } catch (err) {
                console.log(err)
                const songsData = getJSON("library/songs", []);
                const artistsData = getJSON("library/artists", []);
                const privateSongsData = getJSON("library/private_songs", []);
                setLibraryData(songsData, artistsData, privateSongsData);
            } finally {
                setLoading(false);
            }
        })();
    }, [user]); 

    return (
        <LibraryContext.Provider
            value={{ 
                songs, privateSongs, artists, loading, originalSongs, originalPrivateSongs,
                originalArtists, privateAlbums, singlesEps, albums, vinyl,
                setSongs, setPrivateSongs, setArtists, setOriginalSongs,
                setOriginalArtists, setOriginalPrivateSongs, setVinyl
            }}
        >
            {children}
        </LibraryContext.Provider>
    );
};

export const useLibrary = () => {
    const context = useContext(LibraryContext);
    if (!context) throw new Error("useLibrary must be used within a LibraryProvider");
    return context;
};