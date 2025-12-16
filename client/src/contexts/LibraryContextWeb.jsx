import { createContext, useState, useEffect, useContext } from "react";
import { fetchSongs } from "../services/GetService";

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const loadSongs = async () => {
      const saved = localStorage.getItem("library/songs");
      if (saved) {
        setSongs(JSON.parse(saved));
      } else {
        const data = await fetchSongs();
        setSongs(data);
        localStorage.setItem("library/songs", JSON.stringify(data));
      }
    };
    loadSongs();
  }, []);

  return (
    <LibraryContext.Provider value={{ songs, setSongs, artists, setArtists }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) throw new Error("useLibrary must be used within a LibraryProvider");
  return context;
};
