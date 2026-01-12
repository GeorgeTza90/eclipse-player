import { Song } from "@/types/songs";
import { Artist } from "@/types/artists";

export type LibraryContextType = {
  songs: Song[];
  artists: Artist[];
  loading: boolean;
  setSongs: (songs: Song[]) => void;
  setArtists: (artists: Artist[]) => void;
};