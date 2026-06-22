import db from "../db/db.js";
import { User } from "../types/auth.types.js";
import { Song, SongArtists } from "../types/songs.types.js";
import { Artist } from "../types/artists.types.js";

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
    },

    async findSongArtistsForSongs(songIds: number[]): Promise<SongArtists[]> {
        if (songIds.length === 0) return [];
        const [rows] = await db.query<SongArtists[]>(
            "SELECT * FROM song_artists WHERE song_id IN (?)",
            [songIds]
        );
        return rows;
    },

    async findArtistsByIds(artistIds: number[]): Promise<Artist[]> {
        if (artistIds.length === 0) return [];
        const [rows] = await db.query<Artist[]>(
            "SELECT * FROM artists WHERE id IN (?)",
            [artistIds]
        );
        return rows;
    },
};