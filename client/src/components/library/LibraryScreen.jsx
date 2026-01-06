import { useMemo } from "react";
import { useLibrary } from "../../contexts/LibraryContextWeb";
import SearchForm from "./SearchForm";
import styles from "./libraryScreen.module.css";
import { byYear } from "../../utils/songsCetegorizer";
import LibraryGroupItem from "./LibraryGroupItem";

export default function LibraryScreen() {
  const { songs, artists, loading } = useLibrary();
  const singlesEps = useMemo(() => byYear(songs, "single", "ep"), [songs]);
  const albums = useMemo(() => byYear(songs, "album"), [songs]);

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
};