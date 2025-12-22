import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLibrary } from "../../contexts/LibraryContextWeb";
import CollectionCard from "../../components/library/CollectionCard";
import SearchForm from "./SearchForm";
import styles from "./libraryScreen.module.css";
import Categorizer from "../../utils/songsCetegorizer";

export default function LibraryScreen() {
  const navigate = useNavigate();
  const { songs, artists, loading } = useLibrary();

  const singlesEps = useMemo(() => {
    return [...Categorizer(songs, "single", "ep")].sort(
      (a, b) => Number(b.year ?? 0) - Number(a.year ?? 0)
    );
  }, [songs]);

  const albums = useMemo(() => {
    return [...Categorizer(songs, "album")].sort(
      (a, b) => Number(b.year ?? 0) - Number(a.year ?? 0)
    );
  }, [songs]);

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

      <h2 className={styles.categoryTitle}>Singles & EPs</h2>
      <div className={styles.horizontalScroll}>
        {singlesEps.map((item) => (
          <CollectionCard
            key={item.id}
            item={item}
            type="song"
            onClick={() =>
              navigate(`/library/CollectionDetail?album=${encodeURIComponent(item.album)}`)
            }
          />
        ))}
      </div>

      <h2 className={styles.categoryTitle}>Albums</h2>
      <div className={styles.horizontalScroll}>
        {albums.map((item) => (
          <CollectionCard
            key={item.album}
            item={item}
            type="song"
            onClick={() =>
              navigate(`/library/CollectionDetail?album=${encodeURIComponent(item.album)}`)
            }
          />
        ))}
      </div>

      <h2 className={styles.categoryTitle}>Artists</h2>
      <div className={styles.horizontalScroll}>
        {artists.map((artist) => (
          <CollectionCard
            key={artist.name}
            item={artist}
            type="artist"
            onClick={() =>
              navigate(`/library/ArtistInfo?artist=${encodeURIComponent(artist.name)}`)
            }
          />
        ))}
      </div>
    </div>
  );
}
