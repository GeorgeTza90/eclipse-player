import { useEffect, useState } from "react";
import { useLibrary } from "../../contexts/LibraryContextWeb";
import { fetchArtists, fetchSongs } from "../../services/GetService";
import { preloadImages } from "../../utils/preloadImages";
import { useNavigate } from "react-router-dom";
import CollectionCard from "../../components/library/CollectionCard";
import SearchForm from "./SearchForm";
import styles from "./libraryScreen.module.css";
import Categorizer from "../../utils/songsCetegorizer";

export default function LibraryScreen() {
  const navigate = useNavigate();
  const { songs, setSongs } = useLibrary();
  const { artists, setArtists } = useLibrary();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSongsAndImages = async () => {
      try {
        const [songsData, artistsData] = await Promise.all([
          fetchSongs(),
          fetchArtists(),
        ]);

        await preloadImages([
          ...songsData.map((song) => song.image),
          ...artistsData.map((artist) => artist.image_url)
        ]);
        setSongs(songsData);
        setArtists(artistsData);
      } catch (err) {
        console.warn("Error loading songs or images:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSongsAndImages();
  }, [setSongs, setArtists]);


  const singlesEps = Categorizer(songs, "single", "ep");
  const albums = Categorizer(songs, "album");

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className="spinner" />
        <p style={{ color: "#fff", marginTop: 5 }}>Loading library...</p>
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
            type={"song"}
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
            type={"song"}
            onClick={() => navigate(`/library/CollectionDetail?album=${encodeURIComponent(item.album)}`)}
          />
        ))}
      </div>

      {/* Artists */}
      <h2 className={styles.categoryTitle}>Artists</h2>
      <div className={styles.horizontalScroll}>
        {artists.map((item) => (
          <CollectionCard
            key={item.name}
            item={item}
            type={"artist"}
            onClick={() => {
              navigate(`/library/ArtistInfo?artist=${encodeURIComponent(item.name)}`);
            }}
          />
        ))}
      </div>

    </div>
  );
}