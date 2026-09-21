import { useEffect, useState } from "react";
import { ArtistSongsProps } from "@/types/library.types";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLibrary } from "@/contexts/LibraryContextWeb";
import { byYear } from "@/utils/songsCategorizer";
import AlbumSwitchButton from "@/components/ui/buttons/AlbumSwitchButton";
import VinylGroupItem from "../../collections/VinylGroupItem";
import LibraryGroupItem from "../../collections/LibraryGroupItem";
import styles from "./artistSongs.module.css";

const ArtistSongs = ({ artist }: ArtistSongsProps) => {
    const { songs, vinyl } = useLibrary();
    const isMobile = useIsMobile();

    const [groupsKind, setGroupKind] = useState("Singles & EPs");
    
    /* --- SONGS FILTERING --- */
    const artistSongs = artist ? songs.filter(s => s.artists?.some(a => a.name === artist.name)) : [];
    const singlesEps = byYear(artistSongs, "single", "ep");
    const albums = byYear(artistSongs, "album");

    useEffect(() => {
        if (singlesEps.length === 0 && albums.length > 0) setGroupKind("Albums");
    }, [singlesEps, albums]);

    if (artistSongs.length === 0) return <p style={{ color: "#fff", padding: "10px" }}>No songs for this artist.</p>;

    return(
        artistSongs.length > 0 && (
            <div className={styles.songsContainer}>
                {singlesEps.length > 0 && (
                    <AlbumSwitchButton
                        groupsKind={groupsKind}
                        type={"Singles & EPs"}
                        onClick={() => setGroupKind("Singles & EPs")}
                    />
                )}
                {albums.length > 0 && (
                    <AlbumSwitchButton
                        groupsKind={groupsKind}
                        type={"Albums"}
                        onClick={() => setGroupKind("Albums")}
                    />
                )}
                <div className={styles.collectionSectionDiv}>
                    {(vinyl && !isMobile) ? (
                        <VinylGroupItem type={groupsKind} group={groupsKind === "Albums" ? albums : singlesEps} />
                    ) : (
                        <LibraryGroupItem type={groupsKind} group={groupsKind === "Albums" ? albums : singlesEps} />
                    )}
                </div>
            </div>
        )
    );
}

export default ArtistSongs;