import { MouseEventHandler } from "react";
import { Song } from "./songs.types";

export interface Playlist {
    id: number;
    user_id: number;
    title: string;
    description?: string;
    created_at: Date;
    songCount?: number;
}

export interface PlaylistSong {
    id: number;
    playlist_id: number;
    song_id: number;
    order: number;    
}

export interface PlaylistItemProps {
    playlist: Playlist;
    onDelete: () => void;
    onPress: (playlist: Playlist) => void;
}

export interface PlaylistProps {
    name: string;
}

export interface PlaylistSongItemProps {
    item: Song;
    currentSong: Song | null;
    onClick: MouseEventHandler<HTMLDivElement>;
}