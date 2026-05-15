import { presetsRepository } from "../repositories/presetsRepository.js";

export const presetsService = {
    async getPresets(userId: number) {
        return await presetsRepository.findByUserId(userId);
    },

    async createPresets(userId: number, title: string, preset?: string) {
        await presetsRepository.create(userId, title, preset ?? "[]");
    },

    async updatePresets(id: number, userId: number, title?: string, preset?: string) {
        const [result] = await presetsRepository.update(id, userId, title, preset);
        return result;
    },

    async deletePresets(id: number, userId: number) {
        const [result] = await presetsRepository.delete(id, userId);
        return result;
    }
};