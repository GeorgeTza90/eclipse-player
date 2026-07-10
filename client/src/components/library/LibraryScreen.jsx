import { useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useLibrary } from "../../contexts/LibraryContextWeb";
import { useAuth } from "../../contexts/AuthContextWeb";
import { useMinimumLoading } from "../../hooks/useMinimumLoading";
import LibraryGroupItem from "./collections/LibraryGroupItem";
import VinylGroupItem from "./collections/VinylGroupItem";
import LibraryExtentionButton from "../ui/buttons/LibraryExtentionButton";
import Loader from "../ui/loaders/Loader";
import LibrarySearchForm from "../ui/inputs/LibrarySearchForm";
import styles from "./libraryScreen.module.css";

const LibraryScreen = () => {
    const { privateAlbums, singlesEps, albums, artists, loading, vinyl } = useLibrary();
    const { priv_u } = useAuth();
    const isMobile = useIsMobile();
    
    const showLoader = useMinimumLoading(loading, 1500);
    if (showLoader) return <Loader text="Loading Library" />;

    return (
        <div className={styles.container}>
    {/* --- MODE CONTROL --- */}
            <div className={styles.formContainer}>
                <LibrarySearchForm />
                {!isMobile && <LibraryExtentionButton />}
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