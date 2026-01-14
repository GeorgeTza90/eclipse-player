import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLibrary } from "../../contexts/LibraryContextWeb";
import { fetchArtist } from "../../services/GetService";
import styles from "./artistDetail.module.css";
import { byYear } from "../../utils/songsCetegorizer";
import LibraryGroupItem from "../library/LibraryGroupItem";
import BackButton from "../buttons/BackButton";
import MediaLink from "./MediaLink";

export default function ArtistDetail() {
    const [artist, setArtist] = useState(null);
    const [groupsKind, setGroupKind] = useState("Singles & EPs");
    const [searchParams] = useSearchParams();
    const artistName = searchParams.get("artist");
    const { songs } = useLibrary();
    const navigate = useNavigate();

    useEffect(() => {
        if (!artistName) return;

        let cancelled = false;

        (async () => {            
            try {
                const data = await fetchArtist(artistName);
                if (!cancelled) setArtist(data);
            } catch (err) {
                if (cancelled) {
                    console.error(err);
                    navigate("/library");
                }                
            }
        })();

        return () => cancelled = true
    }, [artistName, navigate]);

    if (!artist) return <p style={{ color: "#fff", padding: "10px" }}>Loading artist...</p>;

    const artistSongs = songs.filter(s => s.artist === artist.name);
    const singlesEps = byYear(songs, "single", "ep");
    const albums = byYear(songs, "album");

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {artist.image_url && (
                    <img src={artist.image_url} alt={artist.name} className={styles.Image} />
                )}
                <div className={styles.headerInfo}>
                    <p className={styles.artistName}>{artist.name}</p>
                    <p className={styles.artistInfo}>{artist.description}</p>
                    <div className={styles.contactInfo}>
                        {Object.entries(artist.media).map(([platform, link]) => (
                            <MediaLink key={platform} platform={platform} link={link} />
                        ))}
                    </div>
                </div>
            </div>

            {artistSongs.length > 0 ? (
                <div className={styles.songsContainer}>
                    <button className={groupsKind === "Singles & EPs" ? styles.groupsKindButtonClicked : styles.groupsKindButton} onClick={() => setGroupKind("Singles & EPs")}>Singles & EPs</button>
                    <button className={groupsKind === "Albums" ? styles.groupsKindButtonClicked : styles.groupsKindButton} onClick={() => setGroupKind("Albums")}>Albums</button>
                    <LibraryGroupItem type={groupsKind} group={groupsKind === "Albums" ? albums : singlesEps} />
                </div>
            ) : (
                <><p style={{ color: "#fff", padding: "10px" }}>No songs for this artist.</p></>
            )}

            <BackButton navTo={`/library`} />
        </div >
    );
}
