import { createContext, useState, useContext, useEffect, useRef, ReactNode } from "react";
import { useAudioPlayer as useExpoAudioPlayer, setAudioModeAsync } from "expo-audio";
import { getJSON, getBool } from "@/utils/localStorageManager";
import { Song } from "@/types/songs";
import { AudioContextType } from "@/types/audio";
import { useRouter } from "expo-router";
import { useAudioPersistance } from "./audio/useAudioPersistance";
import { useLoudnessNormalization } from "./audio/useLoudnessNormalization";
import { useAudioPlayer } from "./audio/useAudioPlayer";
import { createAudioControls } from "./audio/createAudioControls";
import { AudioEngine } from "./audio/audioEngine";
import { DEFAULT_LOUDNESS_PRESET, LoudnessPresetKey } from "@/utils/loudnessPresets";

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
    const [library, setLibrary] = useState<Song[]>([]);
    const [playlistName, setPlaylistName] = useState("");
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [volume, setVolumeState] = useState(1);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [shouldAutoplay, setShouldAutoplay] = useState(false);
    const [normalization, setNormalization] = useState(true);
    const [loudnessPreset, setLoudnessPreset] = useState<LoudnessPresetKey>(DEFAULT_LOUDNESS_PRESET);

    const loudnessGain = useLoudnessNormalization({ currentSong, loudnessPreset, normalization });

    const player = useExpoAudioPlayer(currentSong?.url);
    const audioEngineRef = useRef<AudioEngine>(new AudioEngine());
    const nextRef = useRef<(() => void) | null>(null);
    const router = useRouter();

    /* ---------- RESTORE STATE ---------- */
    useEffect(() => {
        (async () => {
            const [
                savedLibrary, savedPlaylistName, savedIndex,
                savedCurrentSong, savedVolume, savedPosition,
                savedNormalization, savedLoudnessPreset,
            ] = await Promise.all([
                getJSON<Song[]>("audio_library", []),
                getJSON<string>("audio_playlistName", ""),
                getJSON<number>("audio_currentSongIndex", 0),
                getJSON<Song | null>("audio_currentSong", null),
                getJSON<number>("audio_volume", 1),
                getJSON<number>("positionRealtime", 0),
                getBool("audio_normalization", true),
                getJSON<LoudnessPresetKey>("audio_loudnessPreset", DEFAULT_LOUDNESS_PRESET),
            ]);

            setLibrary(savedLibrary);
            setPlaylistName(savedPlaylistName);
            setCurrentSongIndex(savedIndex);
            setCurrentSong(savedCurrentSong);
            setVolumeState(savedVolume);
            setPosition(savedPosition);
            setNormalization(savedNormalization);
            setLoudnessPreset(savedLoudnessPreset);
        })();
    }, []);

    /* ---------- PERSIST STATE ---------- */
    useAudioPersistance({
        library, playlistName, currentSongIndex, currentSong, volume, position,
        normalization, loudnessPreset,
    });

    /* ---------- AUDIO MODE ---------- */
    useEffect(() => {
        setAudioModeAsync({
            shouldPlayInBackground: true,
            shouldRouteThroughEarpiece: false,
            interruptionMode: 'duckOthers',
            allowsBackgroundRecording: true,
        });
    }, []);

    /* ---------- LOAD & PLAY CURRENT SONG ---------- */
    useAudioPlayer({
        player, currentSong, volume, loudnessGain, shouldAutoplay,
        audioEngineRef, nextRef,
        setDuration, setPosition, setIsPlaying, setShouldAutoplay,
    });

    /* ---------- RE-APPLY VOLUME WHEN LOUDNESS GAIN CHANGES ---------- */
    useEffect(() => {
        audioEngineRef.current.setVolume(volume * loudnessGain);
    }, [loudnessGain]);

    /* ---------- PLAYER ACTIONS ---------- */
    const { 
        playSong, togglePlay, stop, next, previous, setVolume, seekTo         
    } = createAudioControls({
        audioEngineRef, library, currentSongIndex, loudnessGain, router,
        setLibrary, setPlaylistName, setCurrentSong, setCurrentSongIndex,
        setPosition, setShouldAutoplay, setIsPlaying, setVolumeState,
    });

    nextRef.current = next;

    return (
        <AudioContext.Provider
            value={{
                currentSong, isPlaying, library, playlistName, duration, position, volume,
                normalization, setNormalization, loudnessPreset, setLoudnessPreset,
                playSong, togglePlay, stop, next, previous, setVolume, seekTo, setLibrary,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const ctx = useContext(AudioContext);
    if (!ctx) throw new Error("useAudio must be used within AudioProvider");
    return ctx;
};