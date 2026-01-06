export function Categorizer(songs, param_1, param_2) {
    const resultMap = new Map();

    songs.forEach((s) => {
        if (( param_1 === s.type || (param_2 && param_2 === s.type) ) && !resultMap.has(s.album)) {
        !resultMap.set(s.album, s);
        }
    });    

    return Array.from(resultMap.values());
}

export function byYear(songs, param_1, param_2) {   
    return [...Categorizer(songs, param_1, param_2)].sort(
            (a, b) => Number(b.year ?? 0) - Number(a.year ?? 0)
        );    
}