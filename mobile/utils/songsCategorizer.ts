import { Song } from "../types/songs"

export default function Categorizer(songs: Song[], param_1: string, param_2?: string) {
    const resultMap = new Map();

    songs.forEach((s) => {
        if ((param_1 === s.type || (param_2 && param_2 === s.type)) && !resultMap.has(s.album)) {
            !resultMap.set(s.album, s);
        }
    });

    return Array.from(resultMap.values());
}