import { createContext, useContext, useRef, useState } from "react";
import { AudioEngine } from "./audio/audioEngine";
import { EQEngine } from "./audio/eqEngine";
import { LoudnessEngine } from "./audio/loudnessEngine";
import { useAudioPlayer } from "./audio/useAudioPlayer";
import { createAudioControls } from "./audio/createAudioControls";
import { useAudioPersistence } from "./audio/useAudioPersistence";
import { useLoudnessNormalization } from "./audio/useLoudnessNormalization";
import { DEFAULT_EQ } from "@/utils/defaultEQ";
import { getBool, getJSON } from "@/utils/localStorageManager";
import { DEFAULT_LOUDNESS_PRESET } from "@/utils/loudnessPresets";
import type { Song } from "@/types/songs.types";
import type { EQGains } from "@/types/player.types";
import type { LoudnessPresetKey } from "@/utils/loudnessPresets";
import type { AudioContextValue, AudioProviderProps } from "@/types/audio.types";

const AudioContext = createContext<AudioContextValue | undefined>(undefined);

export const AudioProvider = ({ children }: AudioProviderProps) => {
    const [playlist, setPlaylist] = useState<Song[]>(() => getJSON<Song[]>("audio_playlist", []));
    const [playlistName, setPlaylistName] = useState<string>(() => getJSON<string>("audio_playlistName", ""));
    const [currentSongIndex, setCurrentSongIndex] = useState<number>(() => getJSON<number>("audio_currentSongIndex", 0));
    const [currentSong, setCurrentSong] = useState<Song | null>(() => getJSON<Song | null>("audio_currentSong", null));
    const [volume, setVolumeState] = useState<number>(() => getJSON<number>("audio_volume", 1 ));
    const [normalization, setNormalization] = useState<boolean>(() => getBool("audio_normalization", true));
    const [loudnessPreset, setLoudnessPreset] = useState<LoudnessPresetKey>(() => getJSON<LoudnessPresetKey>("audio_loudnessPreset", DEFAULT_LOUDNESS_PRESET));
    const [positionRealtime, setPositionRealtime] = useState<number>(() => getJSON<number>("positionRealtime", 0));
    const [EQGain, setEQGain] = useState<EQGains>(() => getJSON<EQGains>("EQGain", DEFAULT_EQ));
    
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(0);

    const audioEngineRef = useRef<import("./audio/audioEngine").AudioEngine | null>(null);
    if (!audioEngineRef.current) audioEngineRef.current = new AudioEngine();

    const eqEngineRef = useRef<import("./audio/eqEngine").EQEngine | null>(null);
    if (!eqEngineRef.current) eqEngineRef.current = new EQEngine();

    const loudnessEngineRef = useRef<import("./audio/loudnessEngine").LoudnessEngine | null>(null);
    if (!loudnessEngineRef.current) loudnessEngineRef.current = new LoudnessEngine();

    const isInitialLoadRef = useRef<boolean>(true);
    const nextRef = useRef<(() => void) | null>(null);

    useAudioPersistence({
        playlist, playlistName, loudnessPreset, normalization, currentSongIndex, currentSong, EQGain, volume, audioEngineRef
    });

    useLoudnessNormalization({
        loudnessEngineRef, currentSong, loudnessPreset, normalization
    });

    useAudioPlayer({
        currentSong, volume, audioEngineRef, eqEngineRef, loudnessEngineRef,
        EQGain, normalization, loudnessPreset,
        isInitialLoadRef, nextRef, 
        setDuration, setPositionRealtime, setIsPlaying,
    });

    const {
        playSong, togglePlay, stop, next, previous, seekTo, updateEQGain, resetEQ
    } = createAudioControls({
        audioEngineRef, eqEngineRef, loudnessEngineRef, EQGain, playlist, currentSongIndex, currentSong, normalization, loudnessPreset,
        setPlaylist, setPlaylistName, setCurrentSong, setCurrentSongIndex, setPositionRealtime, setIsPlaying, setEQGain,
    });

    nextRef.current = next;

    const value: AudioContextValue = {
        currentSong, playlist, playlistName, volume, loudnessPreset, EQGain, isPlaying, duration, position: positionRealtime, normalization,
        setCurrentSong, setNormalization, setLoudnessPreset,setVolume: setVolumeState, setPlaylist, setPlaylistName, setEQGain: updateEQGain,
        playSong, togglePlay, stop, next, previous, seekTo, resetEQ, 
    };

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = (): AudioContextValue => {
    const context = useContext(AudioContext);
    if (!context) throw new Error("useAudio must be used within AudioProvider");
    return context;
};