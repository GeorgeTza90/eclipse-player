import db from "../db/db.js";
import { Song, Artist, SongArtists, User } from "../types/controllers.types.js";

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
    },

    async findAllSongArtists(): Promise<SongArtists[]> {
        const [rows] = await db.query<SongArtists[]>("SELECT * FROM song_artists");
        return rows;
    },

    async findAllArtists(): Promise<Artist[]> {
        const [rows] = await db.query<Artist[]>("SELECT * FROM artists");
        return rows;
    }
};