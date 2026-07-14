import { AudioPlayer } from "expo-audio";
import { RefObject } from "react";
import { LoudnessPresetKey } from "@/utils/loudnessPresets";
import { Song } from "./songs";
import { AudioEngine } from "@/contexts/audio/audioEngine";
import { Router } from "expo-router";


export interface AudioContextType {
    currentSong: Song | null;
    isPlaying: boolean;
    library: Song[];
    playlistName: string;
    duration: number;
    position: number;
    volume: number;
    normalization: boolean;
    setNormalization: (val: boolean) => void;
    loudnessPreset: LoudnessPresetKey;
    setLoudnessPreset: (preset: LoudnessPresetKey) => void;
    playSong: (song: Song, playlist?: Song[], name?: string) => void;
    togglePlay: () => void;
    stop: () => void;
    next: () => void;
    previous: () => void;
    setVolume: (vol: number) => void;
    seekTo: (pos: number) => void;
    setLibrary: (library: Song[]) => void;
}

export interface UseAudioPlayerProps {
    player: AudioPlayer;
    currentSong: Song | null;
    volume: number;
    loudnessGain: number;
    shouldAutoplay: boolean;
    audioEngineRef: RefObject<AudioEngine>;
    nextRef: RefObject<(() => void) | null>;
    setDuration: (d: number) => void;
    setPosition: (p: number) => void;
    setIsPlaying: (p: boolean) => void;
    setShouldAutoplay: (v: boolean) => void;
}

export interface UseAudioPersistanceProps {
    library: Song[];
    playlistName: string;
    currentSongIndex: number;
    currentSong: Song | null;
    volume: number;
    position: number;
    normalization: boolean;
    loudnessPreset: LoudnessPresetKey;
}

export interface UseLoudnessNormalizationProps {
    currentSong: Song | null;
    loudnessPreset: LoudnessPresetKey;
    normalization: boolean;
}

export interface CreateAudioControlsProps {
    audioEngineRef: RefObject<AudioEngine>;
    library: Song[];
    currentSongIndex: number;
    loudnessGain: number;
    router: Router;
    setLibrary: (library: Song[]) => void;
    setPlaylistName: (name: string) => void;
    setCurrentSong: (song: Song | null) => void;
    setCurrentSongIndex: (index: number) => void;
    setPosition: (pos: number) => void;
    setShouldAutoplay: (val: boolean) => void;
    setIsPlaying: (val: boolean) => void;
    setVolumeState: (vol: number) => void;
}

export type AudioPlayerProps = {
    onToggleExtention?: (extention: "Playlist" | "Lyrics" | "Equalizer") => void;
}

export interface AudioEngineListeners {
    onTimeUpdate?: (time: number, duration: number) => void;
    onPlayingChange?: (playing: boolean) => void;
    onEnded?: () => void;
}