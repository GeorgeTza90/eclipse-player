import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { useFetchManager } from "../hooks/useCallManager";
import { setJSON, getJSON } from "../utils/localStorageManager";
import { byYear } from "../utils/songsCetegorizer";

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
    const { call: fetchCall } = useFetchManager();

    const [originalSongs, setOriginalSongs] = useState([]);
    const [originalPrivateSongs, setOriginalPrivateSongs] = useState([]);
    const [originalArtists, setOriginalArtists] = useState([]);
    const [songs, setSongs] = useState([]);
    const [privateSongs, setPrivateSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);    

    const setLibraryData = (songsData, artistsData, privateSongsData) => {
        setSongs(songsData);
        setArtists(artistsData);
        setPrivateSongs(privateSongsData);
        setOriginalSongs(songsData);
        setOriginalArtists(artistsData);
        setOriginalPrivateSongs(privateSongsData);
    };

    /* --- SONGS CATEGORIZER --- */
    const privateAlbums = useMemo(() => byYear(privateSongs, "album"), [songs]);
    const singlesEps = useMemo(() => byYear(songs, "single", "ep"), [songs]);
    const albums = useMemo(() => byYear(songs, "album"), [songs]); 
    
    /* --- FETCH SONGS --- */
    useEffect(() => {
        (async () => {
            try {
                const [songsData, artistsData, privateSongsData] = await Promise.all([ fetchCall("songs"), fetchCall("artists"), fetchCall("privateSongs") ]);
                setLibraryData(songsData, artistsData, privateSongsData);
                setJSON("library/songs", songsData);
                setJSON("library/artists", artistsData);
                setJSON("library/songs_private/private", privateSongsData);
            } catch (err) {
                const songsData = getJSON("library/songs", []);
                const artistsData = getJSON("library/artists", []);
                const privateSongsData = getJSON("library/songs/private", []);
                setLibraryData(songsData, artistsData, privateSongsData);
            } finally {
                setLoading(false);
            }
        })();
    }, []); 

    return (
        <LibraryContext.Provider
            value={{ 
                songs, privateSongs, artists, loading, originalSongs, originalPrivateSongs, originalArtists, privateAlbums, singlesEps, albums,
                setSongs, setPrivateSongs, setArtists, setOriginalSongs, setOriginalArtists, setOriginalPrivateSongs
            }}
        >
            {children}
        </LibraryContext.Provider>
    );
};

export const useLibrary = () => {
    const context = useContext(LibraryContext);
    if (!context) {
        throw new Error("useLibrary must be used within a LibraryProvider");
    }
    return context;
};
