import { songsRepository } from "../repositories/songsRepository.js";

export const songsService = {
    async getSongs() {
        return await songsRepository.findAll();
    },

    async getPrivateSongs(userId: number) {
        const user = await songsRepository.findUserPrivateFlag(userId);
        return {
            user,
            songs: user ? await songsRepository.findPrivateSongs() : null
        };
    }
};