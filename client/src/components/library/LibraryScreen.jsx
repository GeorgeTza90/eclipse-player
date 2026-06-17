import { useLibrary } from "../../contexts/LibraryContextWeb";
import { useAuth } from "../../contexts/AuthContextWeb";
import { useMinimumLoading } from "../../hooks/useMinimumLoading.";
import LibraryGroupItem from "./LibraryGroupItem";
import VinylGroupItem from "./VinylGroupItem";
import SearchForm from "./SearchForm";
import Loader from "../ui/loaders/Loader";
import styles from "./libraryScreen.module.css";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useState } from "react";

const LibraryScreen = () => {
    const { privateAlbums, singlesEps, albums, artists, loading, vinyl, setVinyl } = useLibrary();
    const { priv_u } = useAuth();
    const isMobile = useIsMobile();    

    const showLoader = useMinimumLoading(loading, 2000);
    if (showLoader) return <Loader text="Loading Library" />;

    /* --- EXTENTION --- */
    const handleExtention = (key) => setVinyl(key);
    const extentionHoverStyle = { left: `${vinyl === false ? 0 : vinyl === true ? 50 : 66}%` };    

    return (
        <div className={styles.container}>
    {/* --- MODE CONTROL --- */}
            <div className={styles.formContainer}>
                <SearchForm />
                {!isMobile && (
                    <div className={styles.extentionButton} style={{ position: "relative" }}>
                        <div style={extentionHoverStyle} className={styles.extentionHoverStyle} />
                        <button onClick={() => handleExtention(false)} className={styles.extentionButtonsStyle}>Card</button>
                        <button onClick={() => handleExtention(true)} className={styles.extentionButtonsStyle}>Vinyl</button>
                    </div>
                )}
            </div>

            <div className={styles.libraryContainer}>                
    {/* --- VINYL MODE --- */}
                {!isMobile && vinyl && (
                    <div className={styles.groupItemDiv}>
                        {priv_u && <VinylGroupItem type="Private" group={privateAlbums} />}
                        <VinylGroupItem type="Singles & EPs" group={singlesEps} />
                        <VinylGroupItem type="Albums" group={albums} />
                        <LibraryGroupItem type="Artists" group={artists} />
                    </div>
                )}

    {/* --- CARD MODE --- */}
                {(isMobile || !vinyl) && (
                    <div className={styles.groupItemDiv}>
                        {priv_u && <LibraryGroupItem type="Private" group={privateAlbums} />}
                        <LibraryGroupItem type="Singles & EPs" group={singlesEps} />
                        <LibraryGroupItem type="Albums" group={albums} />
                        <LibraryGroupItem type="Artists" group={artists} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default LibraryScreen;