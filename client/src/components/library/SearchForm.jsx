import { useState, useEffect } from "react";
import { useLibrary } from "../../contexts/LibraryContextWeb";
import SearchInput from "../inputs/SearchInput";

const SearchForm = () => {
    const [searchKey, setSearchKey] = useState("");
    const { setSongs, setArtists, originalSongs, originalArtists } = useLibrary();

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
    }, [searchKey, setSongs, setArtists, originalSongs, originalArtists]);

    return (
        <SearchInput
            placeholder="Wanna Search?"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
        />
    );
};

export default SearchForm;