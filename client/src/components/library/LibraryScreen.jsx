import { useEffect, useState } from "react";
import { useLibrary } from "../../contexts/LibraryContextWeb";
import { fetchSongs } from "../../services/GetService";
import { preloadImages } from "../../utils/preloadImages";
import CollectionCard from "../../components/library/CollectionCard";
import { useNavigate } from "react-router-dom";
import styles from "./libraryScreen.module.css";
import SearchForm from "./SearchForm";

export default function LibraryScreen() {
  const navigate = useNavigate();
  const { songs, setSongs } = useLibrary();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSongsAndImages = async () => {
      try {
        const data = await fetchSongs();
        await preloadImages(data.map((song) => song.image));
        setSongs(data);
      } catch (err) {
        console.warn("Error loading songs or images:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSongsAndImages();
  }, [setSongs]);

  const singlesEpsMap = new Map();
  songs.forEach((s) => {
    if ((s.type === "single" || s.type === "ep") && !singlesEpsMap.has(s.album)) {
      singlesEpsMap.set(s.album, s);
    }
  });
  const singlesEps = Array.from(singlesEpsMap.values());

  const albumsMap = new Map();
  songs.forEach((s) => {
    if (s.type === "album" && !albumsMap.has(s.album)) {
      albumsMap.set(s.album, s);
    }
  });
  const albums = Array.from(albumsMap.values());

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className="spinner" />
        <p style={{ color: "#fff", marginTop: 10 }}>Loading library...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>

      <SearchForm />

      {/* Singles & EPs */}
      <h2 className={styles.categoryTitle}>Singles & EPs</h2>
      <div className={styles.horizontalScroll}>
        {singlesEps.map((item) => (
          <CollectionCard
            key={item.id}
            item={item}
            onClick={() => navigate(`/library/CollectionDetail?album=${encodeURIComponent(item.album)}`)}
          />
        ))}
      </div>

      {/* Albums */}
      <h2 className={styles.categoryTitle}>Albums</h2>
      <div className={styles.horizontalScroll}>
        {albums.map((item) => (
          <CollectionCard
            key={item.album}
            item={item}
            onClick={() => navigate(`/library/CollectionDetail?album=${encodeURIComponent(item.album)}`)}
          />
        ))}
      </div>

    </div>
  );
}