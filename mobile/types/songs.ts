import { SongArtist } from "./cards";

export interface SongLoudness {
    integratedLufs: number;
    truePeak: number;
    lufsRange?: number;
}

export type Song = {
    id: string;
    title: string;
    artist: string;
    artists: SongArtist[];
    album: string;
    year: number;
    image: any;
    imageHQ: any;
    url: any;
    type: string;
    duration: number;
    averageColor?: string;
    playlistId?: string;
    feature?: string;
    lyrics?: string;
    loudness?: SongLoudness;
};

export interface PlaylistSong extends Song {
    playlistSongId: number;
    playlistOrder: number;
}

export interface SongRowProps {
    item: PlaylistSong;
    getIndex?: () => number | undefined;
    drag: () => void;
    isActive: boolean;
    onPlay: (song: PlaylistSong) => void;
    onDelete: (songId: string) => void;
    playlistId: number;
}

export type TrackItemProps = {
    item: Song;
    index: number;
    user: any;
    onPressSong: (song: Song) => void;
};

export type PlaylistSongItemProps = {
    item: any;
    currentSongId?: string | number;
    playlistName: string;
    library: any[];
    onPlay: (item: any, library: any[], playlistName: string) => void;
};