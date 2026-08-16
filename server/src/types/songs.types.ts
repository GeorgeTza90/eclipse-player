import { RowDataPacket } from "mysql2";

export interface SongLoudness {
    integratedLufs: number;
    truePeak: number;
    lufsRange: number;
}

export interface Song extends RowDataPacket {
    id: string;
    title: string;
    artist: string;
    album: string;
    year: number;
    image: string;
    url: string;
    type: string;
    duration: number;
    averageColor?: string;
    imageHQ?: string;
    loudness?: SongLoudness;
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