import React, { createContext, useState, useContext, ReactNode } from "react";
import { Song } from "@/types/songs";

type LibraryContextType = {
  songs: Song[];
  setSongs: (songs: Song[]) => void;
};

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  return (
    <LibraryContext.Provider value={{ songs, setSongs }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) throw new Error("useLibrary must be used within LibraryProvider");
  return context;
};
