import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContextWeb";
import { useLibrary } from "../../contexts/LibraryContextWeb";
import { useMiniPlayer } from "../../contexts/MiniPlayerContextWeb";
import { useFetchManager } from "../../hooks/useCallManager";
import { useIsMobile } from "../../hooks/useIsMobile";
import { byYear } from "../../utils/songsCetegorizer";
import MediaLink from "./MediaLink";
import LibraryGroupItem from "../library/LibraryGroupItem";
import VinylGroupItem from "../library/VinylGroupItem";
import MiniPlayer from "../player/MiniPlayer";
import BackButton from "../ui/buttons/BackButton";
import styles from "./artistDetail.module.css";
import AlbumSwitchButton from "../ui/buttons/AlbumSwitchButton";

const ArtistDetail = () => {
    const { state, loading, error, call } = useFetchManager();
    const { name } = useParams();
    const artistName = name ?  decodeURIComponent(name) : null;    
    const artist = state.artist;

    const isMobile = useIsMobile();
    const { barMode, setPlayerPage } = useMiniPlayer();
    const { user } = useAuth();   
    
    const { songs, vinyl } = useLibrary();
    const navigate = useNavigate();   

    const [groupsKind, setGroupKind] = useState("Singles & EPs");
    
    /* --- LOAD ARTIST --- */
    useEffect(() => { if (!artistName) return; call("artist", artistName).catch(() => navigate("/library")); }, [artistName, call, navigate]);    
    if (loading.artist) return <p style={{ color: "#fff", padding: "10px" }}>Loading artist...</p>;
    if (error.artist) return <p style={{ color: "#fff", padding: "10px" }}>Error loading artist.</p>;
    if (!artist) return null;
   
    /* --- SONGS FILTERING --- */    
    const artistSongs = songs.filter(s => s.artists?.some(a => a.name === artist.name));
    const singlesEps = byYear(artistSongs, "single", "ep");
    const albums = byYear(artistSongs, "album");    

    return (
        <div className={styles.container}>
            {!isMobile && user && !barMode && (<MiniPlayer />)}
            {(artist.photos?.length > 0 && !isMobile) && (<img src={artist.photos[0]} alt="" className={styles.backgroundPhoto}/>)}
    {/* Info */}
            <div className={styles.header}>                
                {artist.image_url && (                    
                    <img src={artist.image_url} alt={artist.name} className={styles.Image} />
                )}
                <div className={styles.headerInfo}>
                    <p className={styles.artistName}>{artist.name}</p>
                    <p className={styles.artistInfo}>{artist.description}</p>
                    <div className={styles.contactInfo}>
                        {Object.entries(artist.media ?? {}).map(([platform, link]) => (
                            <MediaLink key={platform} platform={platform} link={link} />
                        ))}
                    </div>
                </div>
            </div>

    {/* Songs */}
            {artistSongs.length > 0 ? (
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
                    <>
                        {(vinyl && !isMobile) ? (
                            <VinylGroupItem  type={groupsKind} group={groupsKind === "Albums" ? albums : singlesEps} />
                        ) : (
                            <LibraryGroupItem  type={groupsKind} group={groupsKind === "Albums" ? albums : singlesEps} />
                        )}
                    </>
                    
                </div>
            ) : (
                <p style={{ color: "#fff", padding: "10px" }}>No songs for this artist.</p>
            )}

    {/* Back Button */}
            <BackButton navTo={`/library`} />
        </div>
    );
}

export default ArtistDetail;