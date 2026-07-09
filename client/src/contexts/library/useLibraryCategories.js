import { useMemo } from "react";
import { byYear } from "../../utils/songsCetegorizer";

export const useLibraryCategories = ({
    songs,
    privateSongs,
}) => {

    const privateAlbums = useMemo(
        () => byYear(privateSongs, "album"),
        [privateSongs]
    );


    const singlesEps = useMemo(
        () => byYear(songs, "single", "ep"),
        [songs]
    );


    const albums = useMemo(
        () => byYear(songs, "album"),
        [songs]
    );


    return {
        privateAlbums,
        singlesEps,
        albums,
    };

};