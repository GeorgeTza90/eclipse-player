import { AppError } from "../errors/AppError.js";
import { songsRepository } from "../repositories/songsRepository.js";

export const songsService = {
    async getSongs() {
        return await songsRepository.findAll();
    },

    async getPrivateSongs(userId: number) {
        const user = await songsRepository.findUserPrivateFlag(userId);
        if (!user) throw new AppError("USER_NOT_FOUND", 404)
        const songs = await songsRepository.findPrivateSongs();
        return { user, songs };
    }
};