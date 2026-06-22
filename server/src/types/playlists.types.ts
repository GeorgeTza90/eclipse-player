import { RowDataPacket } from "mysql2";
import { Request } from "express";

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