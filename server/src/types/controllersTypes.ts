import { Request } from "express";
import { RowDataPacket } from "mysql2";

export interface Artist extends RowDataPacket {
    id: string;
    name: string;
    description: string;
    media: any;
    image_url: string;
}

export interface Song extends RowDataPacket {
    id: string;
    title: string;
    artist: string;
    album: string;
    year: number;
    image: any;
    url: any;
    type: string;
    duration: number;
    averageColor?: string;
    playlistId?: string;
    feature?: string;
    lyrics?: string;
}

export interface SongArtists extends RowDataPacket {
    id: string;
    artist_id: string;
    song_id: string;
    role: string;
}

export interface Playlist extends RowDataPacket {
    id: number;
    user_id: number;
    title: string;
    description?: string;
    created_at: Date;
}

export interface PlaylistSong extends RowDataPacket {
    id: number;
    playlist_id: number;
    song_id: number;
    order: number;    
}

export interface User extends RowDataPacket {
    id: number;
    username: string;
    email: string;
    premium: boolean;
    private: boolean;
    google_id: string;
}

/* =========================
   AUTH TYPES
   ========================= */
export interface JwtUser {
    id: number;
}

export interface AuthenticatedRequest extends Request {
    user: JwtUser;
}

export interface Presets extends RowDataPacket {
    id: number;
    user_id: number;
    title: string;
    preset?: [string];
    created_at: Date;
}

export interface PasswordResetTypes extends RowDataPacket {
    id: number;
    user_id: number;
    token_hash: string;
    expires_at: Date;
    used_at: Date;
}