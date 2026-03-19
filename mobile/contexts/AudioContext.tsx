import React, { createContext, useState, useContext, useEffect, useRef, ReactNode } from "react";
import { useAudioPlayer, setAudioModeAsync, AudioPlayer } from "expo-audio";
import { getJSON, setJSON } from "@/utils/localStorageManager";
import { Song } from "@/types/songs";
import { AudioContextType, EQGainType, EQBand } from "@/types/audio";
import { EQ_BANDS, DEFAULT_EQ } from "@/utils/defaultEQ";
import { useRouter } from "expo-router";

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
  const [EQGain, setEQGain] = useState<EQGainType>(DEFAULT_EQ);  

  const player = useAudioPlayer(currentSong?.url); 
  const playerRef = useRef<AudioPlayer | null>(null);
  const router = useRouter();

  /* ---------- RESTORE STATE ---------- */
  useEffect(() => {
    (async () => {
      setLibrary(await getJSON<Song[]>("audio_library", []));
      setPlaylistName(await getJSON<string>("audio_playlistName", ""));
      setCurrentSongIndex(await getJSON<number>("audio_currentSongIndex", 0));
      setCurrentSong(await getJSON<Song | null>("audio_currentSong", null));
      setVolumeState(await getJSON<number>("audio_volume", 1));
      setPosition(await getJSON<number>("positionRealtime", 0));
    })();
  }, []);

  /* ---------- PERSIST STATE ---------- */
  useEffect(() => {(async()=>setJSON("audio_library", library))();}, [library]);
  useEffect(() => {(async()=>setJSON("audio_playlistName", playlistName))();}, [playlistName]);
  useEffect(() => {(async()=>setJSON("audio_currentSongIndex", currentSongIndex))();}, [currentSongIndex]);
  useEffect(() => { if(currentSong) (async()=>setJSON("audio_currentSong", currentSong))(); }, [currentSong]);
  useEffect(() => {(async()=>setJSON("audio_volume", volume))();}, [volume]);
  useEffect(() => {(async()=>setJSON("positionRealtime", position))();}, [position]);

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
  useEffect(() => {
    if (!currentSong) return;
    
    if (playerRef.current) {
      playerRef.current.release();
      playerRef.current = null;
    }

    player.volume = volume;
    playerRef.current = player;

    if (shouldAutoplay) {
      playerRef.current.play();
      setIsPlaying(true);
      setShouldAutoplay(false);
    }

    const interval = setInterval(() => {
      if (!playerRef.current) return;
      setPosition(playerRef.current.currentTime);
      setDuration(playerRef.current.duration);
      setIsPlaying(playerRef.current.playing);
    }, 200);

    return () => {
      clearInterval(interval);
      if (playerRef.current) {
        playerRef.current.release();
        playerRef.current = null;
      }
    };    
  }, [currentSong]);

  /* ---------- PLAYER ACTIONS ---------- */
  const playSong = (song: Song, playlist?: Song[], name = "") => {
    if (playlist) {
      setLibrary(playlist);
      const index = playlist.findIndex((s) => s.id === song.id);
      setCurrentSongIndex(index >= 0 ? index : 0);
      if (name) setPlaylistName(name);
    }
    setCurrentSong({ ...song });
    setPosition(0);
    setShouldAutoplay(true);
    router.push("/player");    
  };

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) return;

    if (player.playing) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
    }
  };

  const stop = () => {
    const player = playerRef.current;
    if (!player) return;

    player.pause();
    player.seekTo(0);
    setPosition(0);
    setIsPlaying(false);
  };

  const next = () => {
    if (!library.length) return;
    const nextIndex = (currentSongIndex + 1) % library.length;
    setCurrentSongIndex(nextIndex);
    setCurrentSong(library[nextIndex]);
    setPosition(0);
    playerRef.current?.play();
    setIsPlaying(true);
  };

  const previous = () => {
    if (!library.length) return;
    const prevIndex = (currentSongIndex - 1 + library.length) % library.length;
    setCurrentSongIndex(prevIndex);
    setCurrentSong(library[prevIndex]);
    setPosition(0);
    playerRef.current?.play();
    setIsPlaying(true);
  };

  const setVolume = (vol: number) => {
    setVolumeState(vol);
    if (playerRef.current) playerRef.current.volume = vol;
  };

  const seekTo = (pos: number) => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(pos);
    setPosition(pos);
  };

  /* ----------- EQ FUNCTIONS ----------- */
  const updateEQGain = (label: string, value: number) => {
    setEQGain(prev => ({ ...prev, [label]: value }));
  };

  const resetEQ = () => {
    const resetValues: EQGainType = {};
    EQ_BANDS.forEach(band => { resetValues[band.label] = 0; });
    setEQGain(resetValues);
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong, isPlaying, library, playlistName, duration, position, volume, EQGain,
        playSong, togglePlay, stop, next, previous, setVolume, seekTo, setLibrary,
        setEQGain: updateEQGain, resetEQ,
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