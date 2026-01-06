import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Song } from "@/types/songs";
import { Artist } from "@/types/artists";
import { fetchSongs, fetchArtists } from "@/services/api";
import { getJSON, setJSON } from "@/utils/localStorageManager";

type LibraryContextType = {
  songs: Song[];
  artists: Artist[];
  loading: boolean;
  setSongs: (songs: Song[]) => void;
  setArtists: (artists: Artist[]) => void;
};

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLibrary = async () => {
      try {
        const [songsData, artistsData] = await Promise.all([
          fetchSongs(),
          fetchArtists(),
        ]);

        setSongs(songsData);
        setArtists(artistsData);

        await setJSON("library/songs", songsData);
        await setJSON("library/artists", artistsData);
      } catch (err) {
        console.warn("Failed to load library:", err);

        setSongs(await getJSON("library/songs", []));
        setArtists(await getJSON("library/artists", []));
      } finally {
        setLoading(false);
      }
    };

    loadLibrary();
  }, []);

  return (
    <LibraryContext.Provider
      value={{ songs, setSongs, artists, setArtists, loading }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context)
    throw new Error("useLibrary must be used within LibraryProvider");
  return context;
};
