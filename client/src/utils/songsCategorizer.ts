import type { Song } from "@/types/songs.types";

export function Categorizer(songs: Song[], param_1: string, param_2?: string): Song[] {
    const resultMap = new Map<string, Song>();

    songs.forEach((s) => {
        if ((param_1 === s.type || (param_2 && param_2 === s.type)) && !resultMap.has(s.album)) {
            resultMap.set(s.album, s);
        }
    });

    return Array.from(resultMap.values());
}

export function byYear(songs: Song[], param_1: string, param_2?: string): Song[] {
    return [...Categorizer(songs, param_1, param_2)].sort(
        (a, b) => Number(b.year ?? 0) - Number(a.year ?? 0)
    );
}