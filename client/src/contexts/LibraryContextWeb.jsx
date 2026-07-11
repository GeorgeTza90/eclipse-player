import { createContext, useState, useContext } from "react";
import { useAuth } from "./AuthContextWeb";
import { useLibraryFetch } from "./library/useLibraryFetch";
import { useLibraryPersistence } from "./library/useLibraryPersistence";
import { useLibraryCategories } from "./library/useLibraryCategories";
import { useFetchManager } from "../hooks/useCallManager";
import { getBool, removeJSON } from "../utils/localStorageManager";

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

    useLibraryFetch({
        fetchCall, user, priv_u,
        setSongs, setArtists, setPrivateSongs, setLoading,
        setOriginalSongs, setOriginalArtists, setOriginalPrivateSongs,        
    });

    useLibraryPersistence(vinyl);

    const { privateAlbums, singlesEps, albums} = useLibraryCategories({ songs, privateSongs });        

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