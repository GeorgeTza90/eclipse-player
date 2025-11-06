import React, { createContext, useState, useContext, ReactNode } from "react";
import { Song } from "@/types/songs";
import { Artist } from "@/types/artists";

type LibraryContextType = {
  songs: Song[];
  setSongs: (songs: Song[]) => void;
  artists: Artist[];
  setArtists: (artists: Artist[]) => void;
};

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  return (
    <LibraryContext.Provider value={{ songs, setSongs, artists, setArtists }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) throw new Error("useLibrary must be used within LibraryProvider");
  return context;
};
