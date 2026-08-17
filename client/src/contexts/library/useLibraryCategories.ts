import { useMemo } from "react";
import { byYear } from "@/utils/songsCategorizer";
import type { LibraryCategoriesProps } from "@/types/library.types";
import type { Song } from "@/types/songs.types";

export const useLibraryCategories = ({ songs, privateSongs }: LibraryCategoriesProps): {
    privateAlbums: Song[];
    singlesEps: Song[];
    albums: Song[];
} => {
    const privateAlbums = useMemo(() => byYear(privateSongs, "album"), [privateSongs]);
    const singlesEps = useMemo(() => byYear(songs, "single", "ep"), [songs]);
    const albums = useMemo(() => byYear(songs, "album"), [songs]);

    return { privateAlbums, singlesEps, albums };
};