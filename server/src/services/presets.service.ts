import { AppError } from "../errors/AppError.js";
import { presetsRepository } from "../repositories/presets.repository.js";

export const presetsService = {
    async getPresets(userId: number) {
        if (!userId) throw new AppError("USER_NOT_FOUND", 404)
        return await presetsRepository.findByUserId(userId);
    },

    async createPresets(userId: number, title: string, preset?: string) {
        if (!userId) throw new AppError("USER_NOT_FOUND", 404)
        await presetsRepository.create(userId, title, preset ?? "[]");
    },

    async updatePresets(id: number, userId: number, title?: string, preset?: string) {
        if (!userId) throw new AppError("USER_NOT_FOUND", 404)
        const [result] = await presetsRepository.update(id, userId, title, preset);
        return result;
    },

    async deletePresets(id: number, userId: number) {
        if (!userId) throw new AppError("USER_NOT_FOUND", 404)
        const [result] = await presetsRepository.delete(id, userId);
        return result;
    }
};