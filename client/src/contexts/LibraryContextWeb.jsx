import { createContext, useState, useEffect, useContext } from "react";
import { fetchSongs, fetchArtists } from "../services/GetService";

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

        localStorage.setItem("library/songs", JSON.stringify(songsData));
        localStorage.setItem("library/artists", JSON.stringify(artistsData));
      } catch (err) {
        console.warn("Failed to load library:", err);

        const savedSongs = localStorage.getItem("library/songs");
        const savedArtists = localStorage.getItem("library/artists");

        if (savedSongs) setSongs(JSON.parse(savedSongs));
        if (savedArtists) setArtists(JSON.parse(savedArtists));
      } finally {
        setLoading(false);
      }
    };

    loadLibrary();
  }, []);

  return (
    <LibraryContext.Provider
      value={{
        songs,
        setSongs,
        artists,
        setArtists,
        loading,
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
