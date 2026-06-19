import db from "../db/db.js";
import { Presets } from "../types/controllers.types.js";
import { ResultSetHeader } from "mysql2";

export const presetsRepository = {
    async findByUserId(userId: number): Promise<Presets[]> {
        const [rows] = await db.query<Presets[]>("SELECT * FROM eq_presets WHERE user_id = ?", [userId]);
        return rows;
    },

    async create(userId: number, title: string, preset: string) {
        await db.query<ResultSetHeader>("INSERT INTO eq_presets (user_id, title, preset) VALUES (?, ?, ?)", [userId, title, preset]);
    },

    async update(id: number, userId: number, title?: string, preset?: string) {
        return db.query<ResultSetHeader>("UPDATE eq_presets SET title = ?, preset = ? WHERE id = ? AND user_id = ?", [title, preset, id, userId]);
    },

    async delete(id: number, userId: number) {
        return db.query<ResultSetHeader>("DELETE FROM eq_presets WHERE id = ? AND user_id = ?", [id, userId]);
    }
};