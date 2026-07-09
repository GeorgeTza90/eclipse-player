import { createContext, useState, useContext, useRef, useEffect } from "react";
import { getJSON, setJSON } from "../utils/localStorageManager";
import { DEFAULT_EQ } from "../utils/defaultEQ";
import { AudioEngine } from "./audio/audioEngine";
import { EQEngine } from "./audio/eqEngine";
import { useAudioPlayer } from "./audio/useAudioPlayer";
import { useAudioControls } from "./audio/useAudioControls";
import { useAudioPersistence } from "./audio/useAudioPersistence";

const AudioContext = createContext(undefined);

export const AudioProvider = ({ children }) => {
    const [playlist, setPlaylist] = useState(() => getJSON("audio_playlist", []));
    const [playlistName, setPlaylistName] = useState(() => getJSON("audio_playlistName", ""));
    const [currentSongIndex, setCurrentSongIndex] = useState(() => getJSON("audio_currentSongIndex", 0));
    const [currentSong, setCurrentSong] = useState(() => getJSON("audio_currentSong", null));
    const [volume, setVolumeState] = useState(() => getJSON("audio_volume", 1));
    const [positionRealtime, setPositionRealtime] = useState(() => getJSON("positionRealtime", 0));
    const [EQGain, setEQGain] = useState(() => getJSON("EQGain", DEFAULT_EQ));
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);

    const audioEngineRef = useRef(null);
    if (!audioEngineRef.current) audioEngineRef.current = new AudioEngine();

    const eqEngineRef = useRef(null);
    if (!eqEngineRef.current) eqEngineRef.current = new EQEngine();

    const isInitialLoadRef = useRef(true);
    const nextRef = useRef(null);

    useAudioPersistence({
        playlist, playlistName,
        currentSongIndex, currentSong,
        EQGain, volume, audioEngineRef,
    });

    useAudioPlayer({
        currentSong, volume, EQGain,
        audioEngineRef, eqEngineRef, isInitialLoadRef, nextRef,
        setDuration, setPositionRealtime, setIsPlaying,
    });

    const { 
        playSong, togglePlay, stop, next, previous, seekTo, updateEQGain, resetEQ
    } = useAudioControls({
        audioEngineRef, eqEngineRef, playlist, currentSongIndex,
        setPlaylist, setPlaylistName, setCurrentSong, setCurrentSongIndex,
        setPositionRealtime, setIsPlaying, setEQGain,
    });

    nextRef.current = next;

    return (
        <AudioContext.Provider
            value={{
                currentSong, playlist, playlistName, volume,
                EQGain, isPlaying, duration, position: positionRealtime,
                playSong, togglePlay, stop, next, previous, setVolume: setVolumeState,
                seekTo, setPlaylist, resetEQ, setEQGain: updateEQGain,
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