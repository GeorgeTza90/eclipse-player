import type { Dispatch, SetStateAction } from "react";
import type { Artist } from "./artists.types";
import type { Song } from "./songs.types";
import type { HookFunction } from "./callManager.types";
import type { User } from "./auth.types";

export interface LibraryContextValue {
    songs: Song[];
    privateSongs: Song[];
    artists: Artist[];
    loading: boolean;
    originalSongs: Song[];
    originalPrivateSongs: Song[];
    originalArtists: Artist[];
    privateAlbums: Song[];
    singlesEps: Song[];
    albums: Song[];
    vinyl: boolean;
    setSongs: Dispatch<SetStateAction<Song[]>>;
    setPrivateSongs: Dispatch<SetStateAction<Song[]>>;
    setArtists: Dispatch<SetStateAction<Artist[]>>;
    setOriginalSongs: Dispatch<SetStateAction<Song[]>>;
    setOriginalArtists: Dispatch<SetStateAction<Artist[]>>;
    setOriginalPrivateSongs: Dispatch<SetStateAction<Song[]>>;
    setVinyl: Dispatch<SetStateAction<boolean>>;
}

export interface LibraryProviderProps {
    children: React.ReactNode;
}

export interface LibraryCategoriesProps {
    songs: Song[];
    privateSongs: Song[];
}

export interface LibraryFetchProps {
    fetchCall: HookFunction;
    user: User | null;
    priv_u: boolean;
    setSongs: Dispatch<SetStateAction<Song[]>>;
    setArtists: Dispatch<SetStateAction<Artist[]>>;
    setPrivateSongs: Dispatch<SetStateAction<Song[]>>;
    setOriginalSongs: Dispatch<SetStateAction<Song[]>>;
    setOriginalArtists: Dispatch<SetStateAction<Artist[]>>;
    setOriginalPrivateSongs: Dispatch<SetStateAction<Song[]>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface LibraryPersistenceProps {
    vinyl: boolean;
}

export interface GroupItemProps {
    type: string;
    group: Song[] | Artist[]
}

export interface CardProps {
    item: Song | Artist;
    onClick: () => void;
    type: "private" | "artist" | "song";
}

export interface VinylCardSlotProps {
    item: Song;
    type: "private" | "song";
    onNavigate: () => void;
    className?: string;
}

export interface VinylCardProps {
    item: Song;
    onClick: () => void;
    type: "private" | "song";
}

export interface VinylGroupItemProps {
    type: string;
    group: Song[];
}