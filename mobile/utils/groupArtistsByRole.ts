import { SongArtist } from "@/types/cards";

export function groupArtistsByRole(artists: SongArtist[] = []) {
    const mainArtists: string[] = [];
    const featArtists: string[] = [];

    artists.forEach((a) => {
        if (a.role === "main") {
            mainArtists.push(a.name);
        } else if (a.role === "feat") {
            featArtists.push(a.name);
        }
    });

    return { mainArtists, featArtists };
}