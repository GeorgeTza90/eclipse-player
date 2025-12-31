import { createContext, useState, useEffect, useContext } from "react";
import { fetchSongs, fetchArtists } from "../services/GetService";
import { setJSON } from "../utils/localStorageManager";

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
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
        setJSON("library/songs", songsData);
        setJSON("library/artists", artistsData);

      } catch (err) {
        console.warn("Failed to load library:", err);
        setSongs(getJSON("library/songs", []));
        setArtists(getJSON("library/artists", []));

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
  if (!context) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }
  return context;
};
