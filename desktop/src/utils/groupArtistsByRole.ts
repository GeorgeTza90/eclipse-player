import type { ArtistRole, GroupedArtists } from "@/types/artists.types";

export function groupArtistsByRole(artists: ArtistRole[] = []): GroupedArtists {
    const mainArtists: string[] = [];
    const featArtists: string[] = [];

    artists.forEach(a => {
        if (!a) return;

        if (a.role === "main" && !mainArtists.includes(a.name)) {
            mainArtists.push(a.name);
        } else if (a.role === "feat" && !featArtists.includes(a.name)) {
            featArtists.push(a.name);
        }
    });    
    
    return { mainArtists, featArtists };
}