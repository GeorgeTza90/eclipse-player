import { useEffect, useState } from "react";
import styles from "./searchForm.module.css"
import { useLibrary } from "../../contexts/LibraryContextWeb";

const SearchForm = () => {
    const [searchKey, setSearchKey] = useState("");
    const { songs, setSongs } = useLibrary();
    const { artists, setArtists } = useLibrary();
    const [originalSongs, setOriiginalSongs] = useState([]);
    const [originalArtists, setOriginalArtists] = useState([]);

    useEffect(() => {
        if (songs.length > 0 && originalSongs.length === 0) setOriiginalSongs([...songs]);
        if (artists.length > 0 && originalArtists.length === 0) setOriginalArtists([...artists]);
    }, [songs, originalSongs, artists, originalArtists]);

    const onSearch = (key) => {
        const lowerKey = key.toLowerCase().trim();

        if (lowerKey === "") return (setArtists(originalArtists), setSongs(originalSongs));

        const newSongList = songs.filter(s =>
            s.title.toLowerCase().includes(lowerKey) ||
            s.artist.toLowerCase().includes(lowerKey) ||
            s.album.toLowerCase().includes(lowerKey)
        );

        const newArtistsList = artists.filter(a =>
            a.name.toLowerCase().includes(lowerKey)
        )

        setSongs(newSongList);
        setArtists(newArtistsList);
    }

    return (<>
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Wanna Search?"
                value={searchKey}
                onChange={(e) => {
                    const value = e.target.value;
                    setSearchKey(value);
                    onSearch(value);
                }}
                className={styles.input}
            />
        </div>
    </>);
};

export default SearchForm;