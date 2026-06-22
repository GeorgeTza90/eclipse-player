import { RowDataPacket } from "mysql2";
import { Request } from "express";

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