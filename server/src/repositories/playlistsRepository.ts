import db from "../db/db.js";
import { RowDataPacket, ResultSetHeader} from "mysql2";
import { Playlist, PlaylistSong, Song } from "../types/controllersTypes.js";

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
        await db.query<ResultSetHeader>("INSERT INTO playlist_songs (playlist_id, song_id, `order`) VALUES (?, ?, ?)", [playlistId, songId, order]);                
    },

    async updateSongInPlaylist(songs: PlaylistSong[]): Promise<void> {
        await Promise.all(
            songs.map((s, i) =>
                db.query<ResultSetHeader>("UPDATE playlist_songs SET `order` = ? WHERE id = ?", [i, s.id])
            )
        );
    },

    async deleteSongInPlaylist(playlistId: number, songId: number): Promise<ResultSetHeader> {
        const [result] = await db.query<ResultSetHeader>("DELETE FROM playlist_songs WHERE playlist_id = ? AND song_id = ?", [playlistId, songId]);
        return result;
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
}