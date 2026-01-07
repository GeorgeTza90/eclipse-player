import React, { createContext, useState, useContext, ReactNode, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { Song } from "@/types/songs";
import { getJSON, setJSON } from "@/utils/localStorageManager";

type AudioContextType = {
  currentSong: Song | null;
  isPlaying: boolean;
  library: Song[];
  playlistName: string;
  duration: number;
  position: number;
  volume: number;
  playSong: (song: Song, playlist?: Song[], name?: string) => void;
  togglePlay: () => void;
  stop: () => void;
  next: () => void;
  previous: () => void;
  setVolume: (vol: number) => void;
  seekTo: (posMs: number) => void;
  setLibrary: (songs: Song[]) => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  /* ---------- STATE (persisted) ---------- */
  const [library, setLibrary] = useState<Song[]>([]);
  const [playlistName, setPlaylistName] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [volume, setVolumeState] = useState(1);

  /* ---------- RUNTIME ---------- */
  const [positionRealtime, setPositionRealtime] = useState(0);
  const isInitialLoadRef = useRef(true);

  const router = useRouter();
  const player = useAudioPlayer(currentSong?.url ?? null);
  const status = useAudioPlayerStatus(player);

  const isPlaying = status?.playing ?? false;
  const duration = (player?.duration ?? 0) * 1000;

  /* ---------- RESTORE FROM STORAGE ---------- */
  useEffect(() => {
    (async () => {
      setLibrary(await getJSON("audio_library", []));
      setPlaylistName(await getJSON("audio_playlistName", ""));
      setCurrentSongIndex(await getJSON("audio_currentSongIndex", 0));
      setCurrentSong(await getJSON("audio_currentSong", null));
      setVolumeState(await getJSON("audio_volume", 1));
    })();
  }, []);

  /* ---------- PERSIST ---------- */
  useEffect(() => { setJSON("audio_library", library); }, [library]);
  useEffect(() => { setJSON("audio_playlistName", playlistName); }, [playlistName]);
  useEffect(() => { setJSON("audio_currentSongIndex", currentSongIndex); }, [currentSongIndex]);
  useEffect(() => { if (currentSong) setJSON("audio_currentSong", currentSong); }, [currentSong]);
  useEffect(() => {
    setJSON("audio_volume", volume);
    if (player) player.volume = volume;
  }, [volume, player]);

  /* ---------- PLAYER INIT ---------- */
  useEffect(() => {
    if (!player || !currentSong) return;

    if (!isInitialLoadRef.current) {
      try {
        player.play();
      } catch (err) {
        console.warn("Audio play error:", err);
      }
    }

    isInitialLoadRef.current = false;
  }, [currentSong, player]);

  /* ---------- POSITION ---------- */
  useEffect(() => {
    if (!player) return;

    let isMounted = true;

    const updatePosition = () => {
      if (!isMounted) return;
      try {
        if (player.currentTime != null) {
          setPositionRealtime(player.currentTime * 1000);
        }
      } catch {
        // 
      }
    };

    const id = setInterval(updatePosition, 250);

    return () => {
      isMounted = false;
      clearInterval(id);
    };
  }, [player, currentSong]);

  /* ---------- AUTONEXT ---------- */
  useEffect(() => {
    if (!status || !player) return;

    if (!status.playing && status.currentTime != null && status.duration != null) {
      if (status.currentTime >= status.duration) {
        try {
          next();
        } catch {
          //
        }
      }
    }
  }, [status?.playing, status?.currentTime, status?.duration]);

  /* ---------- ACTIONS ---------- */
  const playSong = (song: Song, playlist?: Song[], name = "") => {
    if (!song) return;

    if (playlist) {
      setLibrary(playlist);
      const index = playlist.findIndex(s => s.id === song.id);
      setCurrentSongIndex(index >= 0 ? index : 0);
      if (name) setPlaylistName(name);
    }

    setCurrentSong(song);
    router.push("/player");
  };

  const togglePlay = () => {
    if (!player) return;
    isPlaying ? player.pause() : player.play();
  };

  const stop = () => {
    if (!player) return;
    player.pause();
    player.seekTo(0);
  };

  const next = () => {
    if (!library.length) return;
    const nextIndex = (currentSongIndex + 1) % library.length;
    setCurrentSongIndex(nextIndex);
    setCurrentSong(library[nextIndex]);
  };

  const previous = () => {
    if (!library.length) return;
    const prevIndex = (currentSongIndex - 1 + library.length) % library.length;
    setCurrentSongIndex(prevIndex);
    setCurrentSong(library[prevIndex]);
  };

  const setVolume = (vol: number) => setVolumeState(vol);

  const seekTo = (posMs: number) => {
    if (!player) return;
    player.seekTo(posMs / 1000);
    setPositionRealtime(posMs);
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        isPlaying,
        library,
        playlistName,
        duration,
        volume,
        position: positionRealtime,
        playSong,
        togglePlay,
        stop,
        next,
        previous,
        setVolume,
        seekTo,
        setLibrary,
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