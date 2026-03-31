import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { fetchSongs, fetchArtists, fetchPrivateSongs } from "../services/GetService";
import { setJSON } from "../utils/localStorageManager";
import { byYear } from "../utils/songsCetegorizer";

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [originalSongs, setOriginalSongs] = useState([]);
  const [originalPrivateSongs, setOriginalPrivateSongs] = useState([]);
  const [originalArtists, setOriginalArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [privateSongs, setPrivateSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  const setLibraryData = (songsData, artistsData, privateSongsData) => {
    setSongs(songsData);
    setArtists(artistsData);
    setPrivateSongs(privateSongsData);
    setOriginalSongs(songsData);
    setOriginalArtists(artistsData);
    setOriginalPrivateSongs(privateSongsData);
  };

  const privateAlbums = useMemo(() => byYear(privateSongs, "album"), [songs]);
  const singlesEps = useMemo(() => byYear(songs, "single", "ep"), [songs]);
  const albums = useMemo(() => byYear(songs, "album"), [songs]); 

  /* ---------------- FETCH SONGS ---------------- */
  useEffect(() => {
    (async () => {
      try {
        const [songsData, artistsData, privateSongsData] = await Promise.all([fetchSongs(), fetchArtists(), fetchPrivateSongs()]);
        setLibraryData(songsData, artistsData, privateSongsData);
        setJSON("library/songs", songsData);
        setJSON("library/artists", artistsData);
        setJSON("library/songs_private/private", privateSongsData);
      } catch (err) {
        const songsData = getJSON("library/songs", []);
        const artistsData = getJSON("library/artists", []);
        const privateSongsData = getJSON("library/songs/private", []);
        setLibraryData(songsData, artistsData, privateSongsData);
      } finally {
        setLoading(false);
      }
    })();
  }, []); 

  return (
    <LibraryContext.Provider
      value={{ 
        songs, privateSongs, artists, loading, originalSongs, originalPrivateSongs, originalArtists, privateAlbums, singlesEps, albums,
         setSongs, setPrivateSongs, setArtists, setOriginalSongs, setOriginalArtists, setOriginalPrivateSongs
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
