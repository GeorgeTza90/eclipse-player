import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContextWeb";
import { useLibrary } from "../../../contexts/LibraryContextWeb";
import { useMiniPlayer } from "../../../contexts/MiniPlayerContextWeb";
import { useFetchManager } from "../../../hooks/useCallManager";
import { useMinimumLoading } from "../../../hooks/useMinimumLoading";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { useWidth } from "../../../hooks/useScreen";
import { byYear } from "../../../utils/songsCetegorizer";
import LibraryGroupItem from "../collections/LibraryGroupItem";
import VinylGroupItem from "../collections/VinylGroupItem";
import MiniPlayer from "../../player/mini/MiniPlayer";
import BackButton from "../../ui/buttons/BackButton";
import AlbumSwitchButton from "../../ui/buttons/AlbumSwitchButton";
import Loader from "../../ui/loaders/Loader";
import MediaLink from "../../ui/links/MediaLink";
import styles from "./artistDetail.module.css";

const ArtistDetail = () => {
    const { state, loading, error, call } = useFetchManager();
    const { name } = useParams();

    const artistName = name ? decodeURIComponent(name) : null;
    const artist = state.artist;

    const isMobile = useIsMobile();
    const width = useWidth();
    const { barMode } = useMiniPlayer();
    const { user } = useAuth();
    const { songs, vinyl } = useLibrary();
    const navigate = useNavigate();

    const [groupsKind, setGroupKind] = useState("Singles & EPs");

    /* --- SONGS FILTERING --- */
    const artistSongs = artist ? songs.filter(s => s.artists?.some(a => a.name === artist.name)) : [];
    const singlesEps = byYear(artistSongs, "single", "ep");
    const albums = byYear(artistSongs, "album");

    useEffect(() => {
        if (singlesEps.length === 0 && albums.length > 0) setGroupKind("Albums");
    }, [singlesEps, albums]);

    /* --- LOAD ARTIST --- */
    useEffect(() => {
        if (!artistName) return;
        call("artist", artistName).catch(() => navigate("/library"));
    }, [artistName, call, navigate]);

    const showLoader = useMinimumLoading(loading.artist || !artist, 500);

    if (showLoader) return (<div style={{ display: "flex", justifyContent: "center" }}><Loader text={"Loading artist"} /></div>);
    if (artistSongs.length === 0) return <p style={{ color: "#fff", padding: "10px" }}>No songs for this artist.</p>;
    if (error.artist) return <p style={{ color: "#fff", padding: "10px" }}>Error loading artist.</p>;
    if (!artist) return null;

    const backgroundPhoto = { maxWidth: width };

    return (
        <div className={styles.container}>
            {!isMobile && user && !barMode && (<MiniPlayer />)}
            {artist.photos?.length > 0 && (
                <img src={artist.photos[0]} alt="" className={styles.backgroundPhoto} style={backgroundPhoto} />
            )}

            {/* Info */}
            <div className={styles.header}>
                {(artist.image_url && !isMobile) && (
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
            {artistSongs.length > 0 && (
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
                            <VinylGroupItem type={groupsKind} group={groupsKind === "Albums" ? albums : singlesEps} />
                        ) : (
                            <LibraryGroupItem type={groupsKind} group={groupsKind === "Albums" ? albums : singlesEps} />
                        )}
                    </>
                </div>
            )}

            {/* Back Button */}
            <BackButton navTo={"/library"} />
            <br /><br /><br />
        </div>
    );
};

export default ArtistDetail;