import { Song } from "@/types/songs";
import { Artist } from "@/types/artists";

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