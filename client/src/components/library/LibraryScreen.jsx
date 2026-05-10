import { useLibrary } from "../../contexts/LibraryContextWeb";
import { useAuth } from "../../contexts/AuthContextWeb";
import { useMinimumLoading } from "../../hooks/useMinimumLoading.";
import LibraryGroupItem from "./LibraryGroupItem";
import SearchForm from "./SearchForm";
import Loader from "../ui/Loader";
import styles from "./libraryScreen.module.css";

const LibraryScreen = () => {
    const { privateAlbums, singlesEps, albums, artists, loading } = useLibrary();
    const { priv_u } = useAuth();
        
    /* --- LOADING --- */
    const showLoader = useMinimumLoading(loading, 2000);
    if (showLoader) return <Loader text="Loading Library"/>;

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