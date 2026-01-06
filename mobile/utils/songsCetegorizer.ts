import { Song } from "@/types/songs";

export function Categorizer(
    songs: Song[],
    param_1: string,
    param_2?: string
): Song[] {
    const resultMap = new Map<string, Song>();

    songs.forEach((s) => {
        if ((s.type === param_1 || (param_2 && s.type === param_2)) && !resultMap.has(s.album)) {
            resultMap.set(s.album, s);
        }
    });
    return Array.from(resultMap.values());
}

export function byYear(
    songs: Song[],
    param_1: string,
    param_2?: string
): Song[] {
    return [...Categorizer(songs, param_1, param_2)].sort(
        (a, b) => Number(b.year ?? 0) - Number(a.year ?? 0)
    );
}
