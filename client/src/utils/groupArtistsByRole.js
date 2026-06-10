export function groupArtistsByRole(artists) {
    const mainArtists = [];
    const featArtists = [];

    artists.forEach(a => {
        if (a.role === "main") {
            mainArtists.push(a.name);
        } else if (a.role === "feat") {
            featArtists.push(a.name);
        }
    });

    return { mainArtists, featArtists };
}