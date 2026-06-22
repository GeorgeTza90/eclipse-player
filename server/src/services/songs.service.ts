import { songsRepository } from "../repositories/songs.repository.js";
import { ensureUserAuthorized, ensureUserExists } from "../guards/songs.guard.js";

// -------------------- SERVICE --------------------
export const songsService = {
    async getSongs() {
        const songs = await songsRepository.findAll();
        const songIds = songs.map(s => Number(s.id));

        const songArtists = await songsRepository.findSongArtistsForSongs(songIds);
        const artistIds = [...new Set(songArtists.map(sa => Number(sa.artist_id)))];
        const artists = await songsRepository.findArtistsByIds(artistIds);

        const artistMap = new Map(artists.map(a => [a.id, a]));
        const songArtistMap = new Map<string, { name: string; role: string }[]>();

        for (const sa of songArtists) {
            const artist = artistMap.get(sa.artist_id);
            if (!artist) continue;

            if (!songArtistMap.has(String(sa.song_id))) songArtistMap.set(String(sa.song_id), []);
            songArtistMap.get(String(sa.song_id))!.push({ name: artist.name, role: sa.role });
        }

        return songs.map(song => ({
            ...song,
            artists: songArtistMap.get(String(song.id)) || []
        }));
    },

    async getPrivateSongs(userId: number) {
        const user = await songsRepository.findUserPrivateFlag(userId);
        ensureUserExists(user);
        ensureUserAuthorized(user);
        const songs = await songsRepository.findPrivateSongs();
        return songs;
    }
};