import { artistsRepository } from "../repositories/artists.repository.js";
import { ensureArtistExists } from "../guards/artists.guard.js";

// -------------------- SERVICE --------------------
export const artistsService = {
    async getAllArtists() {
        return artistsRepository.findAll();
    },

    async getArtist(name: string) {        
        const artist = await artistsRepository.findByName(name);
        ensureArtistExists(artist);
        return artist;
    }
};