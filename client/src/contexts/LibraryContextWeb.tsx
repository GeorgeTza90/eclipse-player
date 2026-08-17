import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContextWeb";
import { useLibraryFetch } from "./library/useLibraryFetch";
import { useLibraryPersistence } from "./library/useLibraryPersistence";
import { useLibraryCategories } from "./library/useLibraryCategories";
import { useFetchManager } from "@/hooks/useCallManager";
import { getBool } from "@/utils/localStorageManager";
import type { Song } from "@/types/songs.types";
import type { Artist } from "@/types/artists.types";
import type { LibraryContextValue, LibraryProviderProps } from "@/types/library.types";

const LibraryContext = createContext<LibraryContextValue | undefined>(undefined);

export const LibraryProvider = ({ children }: LibraryProviderProps) => {
    const { call: fetchCall } = useFetchManager();
    const { user, priv_u } = useAuth();

    const [originalSongs, setOriginalSongs] = useState<Song[]>([]);
    const [originalPrivateSongs, setOriginalPrivateSongs] = useState<Song[]>([]);
    const [originalArtists, setOriginalArtists] = useState<Artist[]>([]);
    const [songs, setSongs] = useState<Song[]>([]);
    const [privateSongs, setPrivateSongs] = useState<Song[]>([]);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [vinyl, setVinyl] = useState<boolean>(() => getBool("library_vinylMode", false));

    useLibraryFetch({
        fetchCall, user, priv_u, setSongs, setArtists, setPrivateSongs,
        setLoading, setOriginalSongs, setOriginalArtists, setOriginalPrivateSongs,
    });

    useLibraryPersistence(vinyl);

    const { privateAlbums, singlesEps, albums } = useLibraryCategories({ songs, privateSongs });

    const value: LibraryContextValue = {
        songs, privateSongs, artists, loading, originalSongs, originalPrivateSongs,
        originalArtists, privateAlbums, singlesEps, albums, vinyl,
        setSongs, setPrivateSongs, setArtists, setOriginalSongs,
        setOriginalArtists, setOriginalPrivateSongs, setVinyl,
    };

    return (
        <LibraryContext.Provider value={value}>
            {children}
        </LibraryContext.Provider>
    );
};

export const useLibrary = (): LibraryContextValue => {
    const context = useContext(LibraryContext);
    if (!context) throw new Error("useLibrary must be used within a LibraryProvider");
    return context;
};