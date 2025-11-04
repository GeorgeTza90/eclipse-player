export default function Categorizer(songs, param_1, param_2) {
    const resultMap = new Map();

    songs.forEach((s) => {
        if (( param_1 === s.type || (param_2 && param_2 === s.type) ) && !resultMap.has(s.album)) {
        !resultMap.set(s.album, s);
        }
    });    

    return Array.from(resultMap.values());
}