import { useEffect, useState } from "react";
import styles from "./searchForm.module.css";
import { useLibrary } from "../../contexts/LibraryContextWeb";

const SearchForm = () => {
    const [searchKey, setSearchKey] = useState("");
    const { songs, artists, setSongs, setArtists } = useLibrary();
    const [originalSongs, setOriginalSongs] = useState([]);
    const [originalArtists, setOriginalArtists] = useState([]);

    useEffect(() => {
        if (songs.length && originalSongs.length === 0) setOriginalSongs(songs);
        if (artists.length && originalArtists.length === 0) setOriginalArtists(artists);
    }, [songs, artists, originalSongs.length, originalArtists.length]);

    useEffect(() => {
        const lowerKey = searchKey.toLowerCase().trim();

        if (!lowerKey) {
            setSongs(originalSongs);
            setArtists(originalArtists);
            return;
        }

        const filteredSongs = originalSongs.filter((s) =>
            s.title.toLowerCase().includes(lowerKey) ||
            s.artist.toLowerCase().includes(lowerKey) ||
            s.album.toLowerCase().includes(lowerKey)
        );

        const filteredArtists = originalArtists.filter((a) =>
            a.name.toLowerCase().includes(lowerKey)
        );

        setSongs(filteredSongs);
        setArtists(filteredArtists);
    }, [searchKey, originalSongs, originalArtists, setSongs, setArtists]);

    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Wanna Search?"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className={styles.input}
            />
        </div>
    );
};

export default SearchForm;
