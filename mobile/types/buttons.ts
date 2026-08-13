import { Song } from "@/types/songs";
import { DimensionValue } from "react-native";
import { LoudnessPresetKey } from "@/utils/loudnessPresets";

export type Buttons = {
    text?: string;
    type?: "play" | "pause" | "stop" | "previous" | "next";
    onPress?: () => void;
};

export type AuthButtonProps = {
    loading: boolean;
    isLogin?: boolean;
    title?: string;
    width?: DimensionValue;
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
};

export interface AddPlaylistButtonProps {
    onPress: () => void;
};

export type LoudnessPresetButtonProps = {
    heading: string;
    value: LoudnessPresetKey;
    onChange: (preset: LoudnessPresetKey) => void;
    disabled?: boolean;
};

export type ToggleButtonProps = {
    heading: string;
    isBarMode?: boolean;
    value: boolean;
    onChange: (value: boolean) => void;
    inActive?: boolean;
};