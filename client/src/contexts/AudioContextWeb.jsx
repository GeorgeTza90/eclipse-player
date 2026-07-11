import { createContext, useState, useContext, useRef, useEffect } from "react";
import { getBool, getJSON } from "../utils/localStorageManager";
import { DEFAULT_EQ } from "../utils/defaultEQ";
import { DEFAULT_LOUDNESS_PRESET } from "../utils/loudnessPresets";
import { AudioEngine } from "./audio/audioEngine";
import { EQEngine } from "./audio/eqEngine";
import { LoudnessEngine } from "./audio/loudnessEngine";
import { useAudioPlayer } from "./audio/useAudioPlayer";
import { createAudioControls } from "./audio/createAudioControls";
import { useAudioPersistence } from "./audio/useAudioPersistence";
import { useLoudnessNormalization } from "./audio/useLoudnessNormalization";

const AudioContext = createContext(undefined);

export const AudioProvider = ({ children }) => {
    const [playlist, setPlaylist] = useState(() => getJSON("audio_playlist", []));
    const [playlistName, setPlaylistName] = useState(() => getJSON("audio_playlistName", ""));
    const [currentSongIndex, setCurrentSongIndex] = useState(() => getJSON("audio_currentSongIndex", 0));
    const [currentSong, setCurrentSong] = useState(() => getJSON("audio_currentSong", null));
    const [volume, setVolumeState] = useState(() => getJSON("audio_volume", 1));
    const [normalization, setNormalization] = useState(() => getBool("audio_normalization", true));
    const [loudnessPreset, setLoudnessPreset] = useState(() => getJSON("audio_loudnessPreset", DEFAULT_LOUDNESS_PRESET));
    const [positionRealtime, setPositionRealtime] = useState(() => getJSON("positionRealtime", 0));
    const [EQGain, setEQGain] = useState(() => getJSON("EQGain", DEFAULT_EQ));
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    
    const audioEngineRef = useRef(null);
    if (!audioEngineRef.current) audioEngineRef.current = new AudioEngine();

    const eqEngineRef = useRef(null);
    if (!eqEngineRef.current) eqEngineRef.current = new EQEngine();

    const loudnessEngineRef = useRef(null);
    if (!loudnessEngineRef.current) loudnessEngineRef.current = new LoudnessEngine();

    const isInitialLoadRef = useRef(true);
    const nextRef = useRef(null);

    useAudioPersistence({
        playlist, playlistName, loudnessPreset, normalization,
        currentSongIndex, currentSong, EQGain, volume, audioEngineRef,
    });

    useLoudnessNormalization({
        loudnessEngineRef, currentSong, loudnessPreset, normalization,
    });

    useAudioPlayer({
        currentSong, volume, EQGain, loudnessPreset,
        audioEngineRef, eqEngineRef, loudnessEngineRef, isInitialLoadRef, nextRef,
        setDuration, setPositionRealtime, setIsPlaying,
    });

    const { 
        playSong, togglePlay, stop, next, previous, seekTo, updateEQGain, resetEQ
    } = createAudioControls({
        audioEngineRef, eqEngineRef, loudnessEngineRef, EQGain, playlist, currentSongIndex,
        currentSong, normalization, loudnessPreset,
        setPlaylist, setPlaylistName, setCurrentSong, setCurrentSongIndex,
        setPositionRealtime, setIsPlaying, setEQGain,
    });

    nextRef.current = next;

    return (
        <AudioContext.Provider
            value={{
                currentSong, playlist, playlistName, volume, setCurrentSong,
                EQGain, isPlaying, duration, position: positionRealtime,
                normalization, setNormalization, loudnessPreset, setLoudnessPreset,
                playSong, togglePlay, stop, next, previous, setVolume: setVolumeState,
                seekTo, setPlaylist, setPlaylistName, resetEQ, setEQGain: updateEQGain,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context)  throw new Error("useAudio must be used within AudioProvider");
    return context;
};