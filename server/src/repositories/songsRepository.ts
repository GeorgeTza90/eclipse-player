import db from "../db/db.js";
import { Song, User } from "../types/controllersTypes.js";

export const songsRepository = {
    async findAll(): Promise<Song[]> {
        const [rows] = await db.query<Song[]>("SELECT * FROM songs");
        return rows;
    },

    async findUserPrivateFlag(userId: number): Promise<User | null> {
        const [rows] = await db.query<User[]>("SELECT private FROM users WHERE id = ?", [userId]);
        return rows[0] ?? null;
    },

    async findPrivateSongs(): Promise<Song[]> {
        const [rows] = await db.query<Song[]>("SELECT * FROM private_songs");
        return rows;
    }
};