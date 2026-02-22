import { createContext, useState, useEffect, useContext } from "react";
import { fetchSongs, fetchArtists } from "../services/GetService";
import { setJSON } from "../utils/localStorageManager";

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [originalSongs, setOriginalSongs] = useState([]);
  const [originalArtists, setOriginalArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);  

  /* ---------------- FETCH SONGS ---------------- */
  useEffect(() => {
    (async () => {
      try {
        const [songsData, artistsData] = await Promise.all([
          fetchSongs(),
          fetchArtists(),
        ]);
        setSongs(songsData);
        setArtists(artistsData);
        setOriginalSongs(songsData);
        setOriginalArtists(artistsData);
        setJSON("library/songs", songsData);
        setJSON("library/artists", artistsData);
      } catch (err) {
        const songsData = getJSON("library/songs", []);
        const artistsData = getJSON("library/artists", []);
        setSongs(songsData);
        setArtists(artistsData);
        setOriginalSongs(songsData);
        setOriginalArtists(artistsData);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <LibraryContext.Provider
      value={{ 
        songs, artists, loading, originalSongs, originalArtists,
         setSongs, setArtists, setOriginalSongs, setOriginalArtists 
        }}
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
