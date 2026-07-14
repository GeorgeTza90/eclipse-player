import { createContext, useState, useContext, ReactNode } from "react";
import { LibraryContextType } from "@/types/library";
import { useFetchManager } from "@/hooks/useCallManager";
import { Song } from "@/types/songs";
import { Artist } from "@/types/artists";
import { useAuth } from "./AuthContext";
import { useLibraryFetch } from "./library/useLibraryFetch";
import { useLibraryCategories } from "./library/useLibraryCategories";

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
    const { call: fetchCall } = useFetchManager();
    const { user } = useAuth();

    const [songs, setSongs] = useState<Song[]>([]);
    const [privateSongs, setPrivateSongs] = useState<Song[]>([]);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [originalSongs, setOriginalSongs] = useState<Song[]>([]);
    const [originalPrivateSongs, setOriginalPrivateSongs] = useState<Song[]>([]);
    const [originalArtists, setOriginalArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true);

    useLibraryFetch({
        fetchCall, user,
        setSongs, setPrivateSongs, setArtists,
        setOriginalSongs, setOriginalPrivateSongs, setOriginalArtists,
        setLoading,
    });

    const { privateAlbums, singlesEps, albums } = useLibraryCategories({ songs, privateSongs });

    return (
        <LibraryContext.Provider
            value={{
                songs, privateSongs, artists, originalSongs,
                originalPrivateSongs, originalArtists, loading,
                privateAlbums, singlesEps, albums,
                setSongs, setPrivateSongs, setArtists, setOriginalPrivateSongs,
                setOriginalSongs, setOriginalArtists,
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