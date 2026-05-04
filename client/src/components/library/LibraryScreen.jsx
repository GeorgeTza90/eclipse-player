import { useLibrary } from "../../contexts/LibraryContextWeb";
import { useAuth } from "../../contexts/AuthContextWeb";
import LibraryGroupItem from "./LibraryGroupItem";
import LoadingMessage from "./LoadingMessage";
import SearchForm from "./SearchForm";
import styles from "./libraryScreen.module.css";

const LibraryScreen = () => {
    const { privateAlbums, singlesEps, albums, artists, loading } = useLibrary();
    const { priv_u } = useAuth();     
    
    /* --- LOADING --- */
    if (loading) return <LoadingMessage message="Loading Library ..."/>

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

export default LibraryScreen;