import { AppError } from "../errors/AppError.js";
import { songsRepository } from "../repositories/songsRepository.js";

export const songsService = {
     async getSongs() {
        const songs = await songsRepository.findAll();
        const songArtists = await songsRepository.findAllSongArtists();
        const artists = await songsRepository.findAllArtists();
        
        const artistMap = new Map(artists.map(a => [a.id, a]));        
        const songArtistMap = new Map<string, { name: string; role: string }[]>();

        for (const sa of songArtists) {
            const artist = artistMap.get(sa.artist_id);
            if (!artist) continue;
            if (!songArtistMap.has(sa.song_id)) songArtistMap.set(sa.song_id, []);

            songArtistMap.get(sa.song_id)!.push({ name: artist.name, role: sa.role });
        }
        
        return songs.map(song => ({
            ...song,
            artists: songArtistMap.get(song.id) || []
        }));
    },

    async getPrivateSongs(userId: number) {
        const user = await songsRepository.findUserPrivateFlag(userId);
        if (!user) throw new AppError("USER_NOT_FOUND", 404)
        const songs = await songsRepository.findPrivateSongs();
        return { user, songs };
    }
};