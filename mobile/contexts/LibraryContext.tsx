import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Song } from "@/types/songs";
import { Artist } from "@/types/artists";
import { LibraryContextType } from "@/types/library";
import { fetchSongs, fetchArtists } from "@/services/api";
import { getJSON, setJSON } from "@/utils/localStorageManager";

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {  
  const [songs, setSongs] = useState<Song[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [originalSongs, setOriginalSongs] = useState<Song[]>([]);
  const [originalArtists, setOriginalArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH LIBRARY ---------------- */
  useEffect(() => {
    const loadLibrary = async () => {
      try {
        const [songsData, artistsData] = await Promise.all([
          fetchSongs(),
          fetchArtists(),
        ]);

        setSongs(songsData);
        setArtists(artistsData);

        setOriginalSongs(songsData);
        setOriginalArtists(artistsData);

        await setJSON("library/songs", songsData);
        await setJSON("library/artists", artistsData);

      } catch (err) {

        console.warn("Failed to load library:", err);

        const cachedSongs = await getJSON<Song[]>("library/songs", []);
        const cachedArtists = await getJSON<Artist[]>("library/artists", []);

        setSongs(cachedSongs);
        setArtists(cachedArtists);

        setOriginalSongs(cachedSongs);
        setOriginalArtists(cachedArtists);

      } finally {
        setLoading(false);
      }

    };

    loadLibrary();
  }, []);

  return (
    <LibraryContext.Provider
      value={{
        songs, artists, originalSongs, originalArtists, loading,
        setSongs, setArtists, setOriginalSongs, setOriginalArtists
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