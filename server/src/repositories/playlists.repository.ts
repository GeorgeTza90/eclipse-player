import db from "../db/db.js";
import { RowDataPacket, ResultSetHeader} from "mysql2";
import { Playlist, PlaylistSong, SongArtists, Artist } from "../types/controllers.types.js";

export const playlistsRepository = {
    // PLAYLISTS CRUD
    async findPlaylists(userId: number): Promise<Playlist[]> {
        const [playlists] = await db.query<Playlist[]>("SELECT * FROM playlists WHERE user_id = ?", [userId]);    
        return playlists;
    },
    
    async createPlaylist(userId: number, title: string, description: string): Promise<void> {
        await db.query<ResultSetHeader>("INSERT INTO playlists (user_id, title, description) VALUES (?, ?, ?)", [userId, title, description || ""]);        
    },

    async updatePlaylist(title: string, description: string, id: number, userId: number) {
        const [result] = await db.query<ResultSetHeader>("UPDATE playlists SET title = ?, description = ? WHERE id = ? AND user_id = ?", [title, description, id, userId]);
        return result;
    },

    async deletePlaylist(playlistId: number, userId: number) {
        const [result] = await db.query<ResultSetHeader>("DELETE FROM playlists WHERE id = ? AND user_id = ?", [playlistId, userId]);
        return result;
    },

    // PLAYLISTS SONGS CRUD
    async findPlaylistSongs(playlistId: number): Promise<Playlist[]> {
        const [playlistSuffled] = await db.query<Playlist[]>(
            `SELECT s.*, ps.id AS playlistSongId, ps.order AS playlistOrder
            FROM playlist_songs ps
            JOIN songs s ON ps.song_id = s.id
            WHERE ps.playlist_id = ?
            ORDER BY ps.order ASC`,
            [playlistId]
        );
        return playlistSuffled;
    },

    async createSongInPlaylist(playlistId: number, songId: number, order:number): Promise<void> {
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();
            await conn.query<ResultSetHeader>("INSERT INTO playlist_songs (playlist_id, song_id, `order`) VALUES (?, ?, ?)", [playlistId, songId, order]);
            await conn.query<ResultSetHeader>("UPDATE playlists SET songCount = songCount + 1 WHERE id = ?", [playlistId]);
            await conn.commit();
        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }    
    },

    async updateSongInPlaylist(songs: PlaylistSong[]): Promise<void> {
        await Promise.all(
            songs.map((s, i) =>
                db.query<ResultSetHeader>("UPDATE playlist_songs SET `order` = ? WHERE id = ?", [i, s.id])
            )
        );
    },

    async deleteSongInPlaylist(playlistId: number, songId: number): Promise<ResultSetHeader> {
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();
            const [result] = await conn.query<ResultSetHeader>("DELETE FROM playlist_songs WHERE playlist_id = ? AND song_id = ?", [playlistId, songId]);
            if (result.affectedRows > 0) await conn.query("UPDATE playlists SET songCount = songCount - 1 WHERE id = ?", [playlistId]);
            await conn.commit();
            return result;
        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    },

    // HELPERS
    async findPlaylist(playlistId: number, userId: number): Promise<Playlist[]> {
        const [playlist] = await db.query<Playlist[]>("SELECT * FROM playlists WHERE id = ? AND user_id = ?", [playlistId, userId]);
        return playlist;
    },

    async findPlaylistSong(playlistId: number, songId: number): Promise<PlaylistSong[]> {
        const [playlistSong] = await db.query<PlaylistSong[]>("SELECT id FROM playlist_songs WHERE playlist_id = ? AND song_id = ?", [playlistId, songId]);
        return playlistSong;
    },

    async findPlaylistSongsInOrder(playlistId: number): Promise<PlaylistSong[]> {
        const [playlistSongsInOrder] = await db.query<PlaylistSong[]>("SELECT id, `order` FROM playlist_songs WHERE playlist_id = ? ORDER BY `order` ASC", [playlistId]);
        return playlistSongsInOrder;
    },

    async findMaxOrder(playlistId: number): Promise<RowDataPacket[]> {
        const [lastOrder] = await db.query<RowDataPacket[]>("SELECT MAX(`order`) AS maxOrder FROM playlist_songs WHERE playlist_id = ?", [playlistId]);
        return lastOrder;
    },

    async findAllSongArtists(): Promise<SongArtists[]> {
        const [rows] = await db.query<SongArtists[]>("SELECT * FROM song_artists");
        return rows;
    },

    async findAllArtists(): Promise<Artist[]> {
        const [rows] = await db.query<Artist[]>("SELECT * FROM artists");
        return rows;
    }
}