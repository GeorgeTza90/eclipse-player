import type { ArtistRole } from "./artists.types";

export interface SongLoudness {
    integratedLufs: number;
    truePeak: number;
    lufsRange: number;
}

export interface Song {
    id: string;
    title: string;
    artist: string;
    artists?: ArtistRole[];
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
    playlistSongId?: number;
}

export interface SongArtists{
    id: string;
    artist_id: string;
    song_id: string;
    role: string;
}