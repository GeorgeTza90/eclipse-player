import { Song } from "./songs.types";
import type { Dispatch, SetStateAction } from "react";

export interface AudioPlayerProps {
    onToggleExtention: (key: Extention) => void;
}

export interface LyricsProps {
    currentSong: Song;
    onClick?: () => void;
}

export type Extention = "Playlist" | "Lyrics" | "Equalizer"

export interface MiniPlayerBarProps {
    handleImageToast: (imageUrl: string) => void;
}

export interface MiniPlayerPosition {
    x: number;
    y: number;
}

export interface MiniPlayerRelativePosition {
    x: number;
    y: number;
}

export interface MiniPlayerDragEvent {
    clientX: number;
    clientY: number;
}

export interface MiniPlayerContextValue {
    pos: MiniPlayerPosition;
    dragging: boolean;
    rel: MiniPlayerRelativePosition;
    showImage: boolean;
    showMiniPlayer: boolean;
    showTimeBar: boolean;
    showVolumeBar: boolean;
    showGlow: boolean;
    transparency: boolean;
    barMode: boolean;
    playerPage: boolean;
    coloredGlow: boolean;
    goRGB: boolean;
    onMouseDown: (event: MiniPlayerDragEvent) => void;
    // onMouseMove: (event: MiniPlayerDragEvent) => void;
    // onMouseUp: () => void;
    setPos: Dispatch<SetStateAction<MiniPlayerPosition>>;
    setDragging: Dispatch<SetStateAction<boolean>>;
    setRel: Dispatch<SetStateAction<MiniPlayerRelativePosition>>;
    setShowImage: Dispatch<SetStateAction<boolean>>;
    setShowMiniPlayer: Dispatch<SetStateAction<boolean>>;
    setShowTimeBar: Dispatch<SetStateAction<boolean>>;
    setShowVolumeBar: Dispatch<SetStateAction<boolean>>;
    setShowGlow: Dispatch<SetStateAction<boolean>>;
    setTransparency: Dispatch<SetStateAction<boolean>>;
    setBarMode: Dispatch<SetStateAction<boolean>>;
    setPlayerPage: Dispatch<SetStateAction<boolean>>;
    setColoredGlow: Dispatch<SetStateAction<boolean>>;
    setGoRGB: Dispatch<SetStateAction<boolean>>;
}

export interface MiniPlayerProviderProps {
    children: React.ReactNode;
}

export interface MiniPlayerDragProps {
    pos: MiniPlayerPosition;
    setPos: Dispatch<SetStateAction<MiniPlayerPosition>>;
    dragging: boolean;
    setDragging: Dispatch<SetStateAction<boolean>>;
    rel: MiniPlayerRelativePosition;
    setRel: Dispatch<SetStateAction<MiniPlayerRelativePosition>>;
}

export interface MiniPlayerPersistenceValues {
    showImage: boolean;
    showMiniPlayer: boolean;
    showTimeBar: boolean;
    showVolumeBar: boolean;
    showGlow: boolean;
    transparency: boolean;
    barMode: boolean;
    playerPage: boolean;
    coloredGlow: boolean;
    goRGB: boolean;
}

export interface EqualizerProps {
    color: string;
}

export interface EQBand {
    label: string;
    value: number;
}

export type EQGains = Record<string, number>;

export interface Presets {
    id: number;
    user_id: number;
    title: string;
    preset?: EQGains;
    created_at: Date;
}