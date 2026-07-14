import { useMemo } from "react";
import { byYear } from "@/utils/songsCetegorizer";
import { UseLibraryCategoriesProps } from "@/types/library";

export function useLibraryCategories({ songs, privateSongs }: UseLibraryCategoriesProps) {
    const privateAlbums = useMemo(() => byYear(privateSongs, "album"), [privateSongs]);
    const singlesEps = useMemo(() => byYear(songs, "single", "ep"), [songs]);
    const albums = useMemo(() => byYear(songs, "album"), [songs]);

    return { privateAlbums, singlesEps, albums };
}