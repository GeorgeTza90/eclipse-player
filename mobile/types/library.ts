import { Song } from "@/types/songs";
import { Artist } from "@/types/artists";
import { useFetchManager } from "@/hooks/useCallManager";
import { User } from "./auth";

export type LibraryContextType = {
  songs: Song[];
  privateSongs: Song[];
  artists: Artist[];
  originalSongs: Song[];
  originalPrivateSongs: Song[];
  originalArtists: Artist[];
  loading: boolean;
  privateAlbums: Song[];
  singlesEps: Song[];
  albums: Song[];
  setSongs: (songs: Song[]) => void;
  setPrivateSongs: (privateSongs: Song[]) => void;
  setArtists: (artists: Artist[]) => void;
  setOriginalSongs: (songs: Song[]) => void;
  setOriginalPrivateSongs: (privateSongs: Song[]) => void;
  setOriginalArtists: (artists: Artist[]) => void;
};

export interface UseLibraryFetchProps {
    fetchCall: ReturnType<typeof useFetchManager>["call"];
    user: User | null;
    setSongs: (songs: Song[]) => void;
    setPrivateSongs: (songs: Song[]) => void;
    setArtists: (artists: Artist[]) => void;
    setOriginalSongs: (songs: Song[]) => void;
    setOriginalPrivateSongs: (songs: Song[]) => void;
    setOriginalArtists: (artists: Artist[]) => void;
    setLoading: (val: boolean) => void;
}

export interface UseLibraryCategoriesProps {
    songs: Song[];
    privateSongs: Song[];
}