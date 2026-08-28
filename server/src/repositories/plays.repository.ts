import db from "@/db/db.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Play } from "@/types/plays.types.js";

export const playsRepository = {
    async createPlay(
        userId: number,
        songId: number,
        durationListenedSeconds: number,
        songDurationSeconds: number,
        completed: boolean
    ): Promise<number> {
        const [result] = await db.query<ResultSetHeader>(
            `INSERT INTO plays (user_id, song_id, duration_listened_seconds, song_duration_seconds, completed)
             VALUES (?, ?, ?, ?, ?)`,
            [userId, songId, durationListenedSeconds, songDurationSeconds, completed]
        );
        return result.insertId;
    },

    async findById(id: number): Promise<Play[]> {
        const [rows] = await db.query<Play[]>("SELECT * FROM plays WHERE id = ?", [id]);
        return rows;
    },

    async findTopSongsForUser(userId: number, sinceDate: Date, limit: number) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT song_id, COUNT(*) AS playCount
             FROM plays
             WHERE user_id = ? AND completed = TRUE AND played_at >= ?
             GROUP BY song_id
             ORDER BY playCount DESC
             LIMIT ?`,
            [userId, sinceDate, limit]
        );
        return rows;
    },
};