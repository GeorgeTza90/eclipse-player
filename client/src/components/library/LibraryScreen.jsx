import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLibrary } from "../../contexts/LibraryContextWeb";
import SearchForm from "./SearchForm";
import styles from "./libraryScreen.module.css";
import Categorizer from "../../utils/songsCetegorizer";
import LibraryGroupItem from "../ui/LibraryGroupItem";

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
      <LibraryGroupItem type="Singles & EPs" group={singlesEps} />
      <LibraryGroupItem type="Albums" group={albums} />
      <LibraryGroupItem type="Artists" group={artists} />
    </div>
  );
}