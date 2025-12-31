import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useLibrary } from "../../contexts/LibraryContextWeb";
import { fetchArtist } from "../../services/GetService";
import styles from "./artistDetail.module.css";
import Categorizer from "../../utils/songsCetegorizer";
import LibraryGroupItem from "../ui/LibraryGroupItem";
import BackButton from "../buttons/BackButton";

export default function ArtistDetail() {
    const [artist, setArtist] = useState(null);
    const [groupsKind, setGroupKind] = useState("singlesEps");
    const [searchParams] = useSearchParams();
    const artistName = searchParams.get("artist");
    const { songs } = useLibrary();
    const navigate = useNavigate();

    useEffect(() => {
        const loadArtist = async () => {
            if (!artistName) return;
            try {
                const data = await fetchArtist(artistName);
                setArtist(data);
            } catch (err) {
                console.error(err);
                navigate("/library");
            }
        };
        loadArtist();
    }, [artistName, navigate]);

    if (!artist) return <p style={{ color: "#fff", padding: "10px" }}>Loading artist...</p>;

    const artistSongs = songs.filter(s => s.artist === artist.name);
    const singlesEps = Categorizer(artistSongs, "single", "ep");
    const albums = Categorizer(artistSongs, "album");

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
                        <Link to={`${artist.media.instagram}`} className={`${styles.contactIcon} ${styles.instagram}`} />
                        <Link to={`${artist.media.facebook}`} className={`${styles.contactIcon} ${styles.facebook}`} />
                        <Link to={`${artist.media.youtube}`} className={`${styles.contactIcon} ${styles.youtube}`} />
                        <Link to={`${artist.media.twitter}`} className={`${styles.contactIcon} ${styles.twitter}`} />
                        <Link to={`${artist.media.mail}`} className={`${styles.contactIcon} ${styles.mail}`} />
                    </div>
                </div>
            </div>

            {artistSongs.length > 0 ? (
                <div className={styles.songsContainer}>
                    <button className={groupsKind === "singlesEps" ? styles.groupsKindButtonClicked : styles.groupsKindButton} onClick={() => setGroupKind("singlesEps")}>Singles & EPs</button>
                    <button className={groupsKind === "albums" ? styles.groupsKindButtonClicked : styles.groupsKindButton} onClick={() => setGroupKind("albums")}>Albums</button>
                    {groupsKind === "singlesEps" && <LibraryGroupItem type="Singles & EPs" group={singlesEps} />}
                    {groupsKind === "albums" && <LibraryGroupItem type="Albums" group={albums} />}
                </div>
            ) : (
                <><p style={{ color: "#fff", padding: "10px" }}>No songs for this artist.</p></>
            )}

            <BackButton navTo={`/library`} />
        </div >
    );
}
