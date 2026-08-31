import db from "@/db/db.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Play } from "@/types/plays.types.js";
import { Song } from "@/types/songs.types.js";
import { User } from "@/types/auth.types.js";

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

    async findTotalListeningTime(userId: number, sinceDate: Date) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT COALESCE(SUM(duration_listened_seconds), 0) AS totalSeconds
            FROM plays
            WHERE user_id = ? AND completed = TRUE AND played_at >= ?`,
            [userId, sinceDate]
        );
        return rows[0].totalSeconds as number;
    },

    async findMonthlyHistory(userId: number, monthsBack: number) {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT
                DATE_FORMAT(played_at, '%Y-%m') AS month,
                COUNT(*) AS playCount,
                SUM(duration_listened_seconds) AS totalSeconds
            FROM plays
            WHERE user_id = ? AND completed = TRUE
            AND played_at >= DATE_SUB(NOW(), INTERVAL ? MONTH)
            GROUP BY month
            ORDER BY month DESC`,
            [userId, monthsBack]
        );
        return rows;
    },

    async findHistory(userId: number, sinceDate: Date | null, groupFormat: string) {
        const params: (number | Date)[] = [userId];
        let dateFilter = "";

        if (sinceDate) {
            dateFilter = "AND played_at >= ?";
            params.push(sinceDate);
        }

        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT
                DATE_FORMAT(played_at, '${groupFormat}') AS bucket,
                COUNT(*) AS playCount,
                SUM(duration_listened_seconds) AS totalSeconds
            FROM plays
            WHERE user_id = ? ${dateFilter} AND completed = TRUE
            GROUP BY bucket
            ORDER BY bucket ASC`,
            params
        );
        return rows;
    },

    async findSongById(songId: number): Promise<Song[]> {
        const [rows] = await db.query<Song[]>("SELECT * FROM songs WHERE id = ? LIMIT 1", [songId]);
        return rows;
    },

    async findSongHistory(songId: number, sinceDate: Date | null, groupFormat: string) {
        const params: (number | Date)[] = [songId];
        let dateFilter = "";

        if (sinceDate) {
            dateFilter = "AND played_at >= ?";
            params.push(sinceDate);
        }

        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT
                DATE_FORMAT(played_at, '${groupFormat}') AS bucket,
                COUNT(*) AS playCount,
                SUM(duration_listened_seconds) AS totalSeconds
            FROM plays
            WHERE song_id = ? ${dateFilter} AND completed = TRUE
            GROUP BY bucket
            ORDER BY bucket ASC`,
            params
        );
        return rows;
    },

    async findUserPrivateFlag(userId: number): Promise<User | null> {
        const [rows] = await db.query<User[]>("SELECT private FROM users WHERE id = ?", [userId]);
        return rows[0] ?? null;
    },

    async countPlaysFotSong(songId: number) {
        const [rows] = await db.query<RowDataPacket[]>(`SELECT COUNT(*) AS playCount FROM plays WHERE song_id = ?`, [songId]);        
        return Number(rows[0].playCount);
    }
};