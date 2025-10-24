import { useEffect, useState } from "react";
import styles from "./searchForm.module.css"
import { useLibrary } from "../../contexts/LibraryContextWeb";

const SearchForm = () => {
    const [searchKey, setSearchKey] = useState("");
    const { songs, setSongs } = useLibrary();
    const [originalSongs, setOriiginalSongs] = useState([]);

    useEffect(() => {
        if (songs.length > 0 && originalSongs.length === 0) setOriiginalSongs(songs);
    }, [songs, originalSongs]);

    const onSearch = (key) => {
        const lowerKey = key.toLowerCase().trim();
        const newSongList = songs.filter(s =>
            s.title.toLowerCase().includes(lowerKey) ||
            s.artist.toLowerCase().includes(lowerKey) ||
            s.album.toLowerCase().includes(lowerKey)
        );

        if (lowerKey === "") return setSongs(originalSongs);

        setSongs(newSongList);
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