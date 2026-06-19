import { artistsRepository } from "../repositories/artists.repository.js";

export const artistsService = {
    async getAllArtists() {
        return await artistsRepository.findAll();
    },

    async getArtist(name: string) {        
        return await artistsRepository.findByName(name);
    }
};