import { Song } from "@/types/songs";

export type Buttons = {
    text?: string;
    type?: "play" | "pause" | "stop" | "previous" | "next";
    onPress?: () => void;
};

export type AuthButtonProps = {
    loading: boolean;
    isLogin?: boolean;
    title?: string;
    onPress: () => void;
};

export type DeleteSongButtonProps = {
    playlistId: number;
    songId: number;
    onDeleted?: () => void;
};

export type DeletePlaylistButtonProps = {
    playlistId: number;
    onDeleted?: () => void;
};

export interface AddToPlaylistButtonProps {
    song: Song;
}

