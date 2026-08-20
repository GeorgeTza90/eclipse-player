import type React from "react";
import type { Song } from "./songs.types";
import type { AudioEngine } from "@/contexts/audio/audioEngine";
import type { EQEngine } from "@/contexts/audio/eqEngine";
import type { LoudnessEngine } from "@/contexts/audio/loudnessEngine";
import type { EQGains } from "@/types/player.types";
import type { LoudnessPresetKey } from "@/utils/loudnessPresets";

export interface AudioEngineLoadOptions {
    volume?: number;
    startPosition?: number;
}

export interface AudioPlayerProps {
    currentSong: Song | null;
    volume: number;
    audioEngineRef: React.RefObject<AudioEngine | null>;
    isInitialLoadRef: React.RefObject<boolean>;
    nextRef: React.RefObject<(() => void) | null>;
    setDuration: React.Dispatch<React.SetStateAction<number>>;
    setPositionRealtime: React.Dispatch<React.SetStateAction<number>>;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AudioPersistenceProps {
    playlist: Song[];
    playlistName: string;
    currentSongIndex: number;
    currentSong: Song | null;
    EQGain: EQGains;
    volume: number;
    audioEngineRef: React.RefObject<AudioEngine | null>;
    loudnessPreset: LoudnessPresetKey;
    normalization: boolean;
}

export interface LoudnessNormalizationProps {
    loudnessEngineRef: React.RefObject<LoudnessEngine | null>;
    currentSong: Song | null;
    loudnessPreset: LoudnessPresetKey;
    normalization: boolean;
}

export interface CreateAudioControlsParams {
    audioEngineRef: React.RefObject<AudioEngine | null>;
    eqEngineRef: React.RefObject<EQEngine | null>;
    loudnessEngineRef: React.RefObject<LoudnessEngine | null>;
    currentSong: Song | null;
    normalization: boolean;
    loudnessPreset: LoudnessPresetKey;
    playlist: Song[];
    currentSongIndex: number;
    EQGain: EQGains;
    setPlaylist: React.Dispatch<React.SetStateAction<Song[]>>;
    setPlaylistName: React.Dispatch<React.SetStateAction<string>>;
    setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>;
    setCurrentSongIndex: React.Dispatch<React.SetStateAction<number>>;
    setPositionRealtime: React.Dispatch<React.SetStateAction<number>>;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    setEQGain: React.Dispatch<React.SetStateAction<EQGains>>;
}

export interface AudioContextValue {
    currentSong: Song | null;
    playlist: Song[];
    playlistName: string;
    volume: number;    
    EQGain: EQGains;
    isPlaying: boolean;
    duration: number;
    position: number;
    normalization: boolean;    
    loudnessPreset: LoudnessPresetKey;
    
    setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>;
    setNormalization: React.Dispatch<React.SetStateAction<boolean>>;
    setLoudnessPreset: React.Dispatch<React.SetStateAction<LoudnessPresetKey>>;
    setPlaylist: React.Dispatch<React.SetStateAction<Song[]>>;
    setPlaylistName: React.Dispatch<React.SetStateAction<string>>;

    playSong: (song: Song, newPlaylist?: Song[], name?: string, startPosition?: number) => Promise<void>;
    togglePlay: () => Promise<void>;
    stop: () => void;
    next: () => void;
    previous: () => void;
    setVolume: React.Dispatch<React.SetStateAction<number>>;
    seekTo: (position: number) => void;

    resetEQ: () => void;
    setEQGain: (label: string, value: number ) => void;
}

export interface AudioProviderProps {
    children: React.ReactNode;
}

export type LoudnessPreset = "quiet" | "normal" | "loud";