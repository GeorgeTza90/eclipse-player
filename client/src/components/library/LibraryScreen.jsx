import { useLibrary } from "../../contexts/LibraryContextWeb";
import { useAuth } from "../../contexts/AuthContextWeb";
import SearchForm from "./SearchForm";
import styles from "./libraryScreen.module.css";
import LibraryGroupItem from "./LibraryGroupItem";

export default function LibraryScreen() {
  const { privateAlbums, singlesEps, albums, artists, loading } = useLibrary();
  const { priv_u } = useAuth(); 
  
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
      <div className={styles.groupItemDiv}>
        {priv_u && (<LibraryGroupItem type="Private" group={privateAlbums} />)}
        <LibraryGroupItem type="Singles & EPs" group={singlesEps} />
        <LibraryGroupItem type="Albums" group={albums} />
        <LibraryGroupItem type="Artists" group={artists} />        
      </div>      
    </div>
  );
};