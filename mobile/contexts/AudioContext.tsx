import React, { createContext, useState, useContext, useEffect, useRef, ReactNode } from "react";
import { Audio } from "expo-av"; // αν θέλεις SDK 54+, αντικατάστησε με expo-audio
import { getJSON, setJSON } from "@/utils/localStorageManager";
import { Song } from "@/types/songs";
import { AudioContextType } from "@/types/audio";
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

  const soundRef = useRef<Audio.Sound | null>(null);
  const isInitialLoadRef = useRef(true);
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

  /* ---------- PERSIST STATE (inline async) ---------- */
  useEffect(() => {(async()=>setJSON("audio_library", library))();}, [library]);
  useEffect(() => {(async()=>setJSON("audio_playlistName", playlistName))();}, [playlistName]);
  useEffect(() => {(async()=>setJSON("audio_currentSongIndex", currentSongIndex))();}, [currentSongIndex]);
  useEffect(() => { if(currentSong) (async()=>setJSON("audio_currentSong", currentSong))(); }, [currentSong]);
  useEffect(() => {(async()=>setJSON("audio_volume", volume))();}, [volume]);
  useEffect(() => {(async()=>setJSON("positionRealtime", position))();}, [position]);

  /* ---------- AUDIO MODE ---------- */
  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: false,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  /* ---------- LOAD & PLAY CURRENT SONG ---------- */
  useEffect(() => {
    if (!currentSong) return;

    let isCancelled = false;

    (async () => {
      if (soundRef.current) {
        try { await soundRef.current.unloadAsync(); } catch {}
        soundRef.current.setOnPlaybackStatusUpdate(null);
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: currentSong.url },
        { shouldPlay: false, volume }
      );

      if (isCancelled) return;

      soundRef.current = sound;

      soundRef.current.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        setPosition(status.positionMillis);
        setIsPlaying(status.isPlaying);

        if (status.didJustFinish) next(true);
      });

      const status = await sound.getStatusAsync();
      if (status.isLoaded) setDuration(status.durationMillis ?? 0);

      if (isInitialLoadRef.current === false) {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }

      isInitialLoadRef.current = false;
    })();

    return () => { isCancelled = true; };
  }, [currentSong]);


  /* ---------- PLAYER ACTIONS ---------- */
  const playSong = (song: Song, playlist?: Song[], name = "") => {
    if (playlist) {
      setLibrary(playlist);
      const index = playlist.findIndex((s) => s.id === song.id);
      setCurrentSongIndex(index >= 0 ? index : 0);
      if (name) setPlaylistName(name);
    }
    setCurrentSong({ ...song }); // νέο object για να τρέξει useEffect
    setPosition(0);
    router.push("/player");
  };

  const togglePlay = async () => {
    if (!soundRef.current) return;
    const status = await soundRef.current.getStatusAsync();
    if (!status.isLoaded) return;

    if (status.isPlaying) await soundRef.current.pauseAsync(), setIsPlaying(false);
    else await soundRef.current.playAsync(), setIsPlaying(true);
  };

  const stop = async () => {
    if (!soundRef.current) return;
    await soundRef.current.stopAsync();
    setPosition(0);
    setIsPlaying(false);
  };

  const next = async (autoPlay = false) => {
    if (!library.length) return;
    const nextIndex = (currentSongIndex + 1) % library.length;
    setCurrentSongIndex(nextIndex);
    setCurrentSong(library[nextIndex]);
    setPosition(0);
    if (autoPlay && soundRef.current) await soundRef.current.playAsync(), setIsPlaying(true);
  };

  const previous = async () => {
    if (!library.length) return;
    const prevIndex = (currentSongIndex - 1 + library.length) % library.length;
    setCurrentSongIndex(prevIndex);
    setCurrentSong(library[prevIndex]);
    setPosition(0);
    if (soundRef.current) await soundRef.current.playAsync(), setIsPlaying(true);
  };

  const setVolume = async (vol: number) => {
    setVolumeState(vol);
    if (soundRef.current) await soundRef.current.setVolumeAsync(vol);
  };

  const seekTo = async (pos: number) => {
    if (!soundRef.current) return;
    await soundRef.current.setPositionAsync(pos);
    setPosition(pos);
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        isPlaying,
        library,
        playlistName,
        duration,
        position,
        volume,
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