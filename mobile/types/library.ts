import { Song } from "@/types/songs";
import { Artist } from "@/types/artists";

export type LibraryContextType = {
  songs: Song[];
  artists: Artist[];
  originalSongs: Song[];
  originalArtists: Artist[];
  loading: boolean;
  setSongs: (songs: Song[]) => void;
  setArtists: (artists: Artist[]) => void;
  setOriginalSongs: (songs: Song[]) => void;
  setOriginalArtists: (artists: Artist[]) => void;
};