import db from "../db/db.js";
import { Artist } from "../types/controllersTypes.js";

export const artistsRepository = {
    async findAll(): Promise<Artist[]> {
        const [rows] = await db.query<Artist[]>("SELECT * FROM artists");
        return rows;
    },

    async findByName(name: string): Promise<Artist | null> {
        const [rows] = await db.query<Artist[]>("SELECT * FROM artists WHERE name = ?", [name]);
        return rows[0] ?? null;
    }
};