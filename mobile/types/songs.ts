export type Song = {
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
