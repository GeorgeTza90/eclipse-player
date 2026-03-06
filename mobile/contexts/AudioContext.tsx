import React, { createContext, useState, useContext, useEffect, useRef, ReactNode } from "react";
import { Audio } from "expo-av";
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
  const [EQGain, setEQGain] = useState<EQGainType>(DEFAULT_EQ);

  const soundRef = useRef<Audio.Sound | null>(null);
  const isInitialLoadRef = useRef(true);
  const router = useRouter();

  /* ----------- RESTORE STATE ASYNC ----------- */
  useEffect(() => {
    (async () => {
      setLibrary(await getJSON<Song[]>("audio_library", []));
      setPlaylistName(await getJSON<string>("audio_playlistName", ""));
      setCurrentSongIndex(await getJSON<number>("audio_currentSongIndex", 0));
      setCurrentSong(await getJSON<Song | null>("audio_currentSong", null));
      setVolumeState(await getJSON<number>("audio_volume", 1));
      setPosition(await getJSON<number>("positionRealtime", 0));
      setEQGain(await getJSON<EQGainType>("EQGain", DEFAULT_EQ));
    })();
  }, []);

  /* ----------- PERSIST STATE ASYNC ----------- */
  useEffect(() => { setJSON("audio_library", library); }, [library]);
  useEffect(() => { setJSON("audio_playlistName", playlistName); }, [playlistName]);
  useEffect(() => { setJSON("audio_currentSongIndex", currentSongIndex); }, [currentSongIndex]);
  useEffect(() => { if (currentSong) setJSON("audio_currentSong", currentSong); }, [currentSong]);
  useEffect(() => { setJSON("audio_volume", volume); }, [volume]);
  useEffect(() => { setJSON("positionRealtime", position); }, [position]);
  useEffect(() => { setJSON("EQGain", EQGain); }, [EQGain]);

  /* ----------- AUDIO MODE ----------- */
  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: false,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  /* ----------- LOAD CURRENT SONG ----------- */
  useEffect(() => {
    if (!currentSong) return;
    let cancelled = false;

    (async () => {
      if (soundRef.current) {
        try { await soundRef.current.unloadAsync(); } catch {}
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: currentSong.url },
        {
          shouldPlay: false,
          volume,
          positionMillis: position,
        }
      );

      if (cancelled) return;
      soundRef.current = sound;

      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;

        setPosition(status.positionMillis);
        setDuration(status.durationMillis ?? 0);

        if (status.isPlaying !== undefined) setIsPlaying(status.isPlaying);
        if (status.didJustFinish) next(true);
      });

      if (!isInitialLoadRef.current) await sound.playAsync();
      isInitialLoadRef.current = false;
    })();

    return () => { cancelled = true; };
  }, [currentSong]);

  /* ----------- PLAYER ACTIONS ----------- */
  const playSong = (song: Song, playlist?: Song[], name = "") => {
    if (playlist) {
      setLibrary(playlist);
      const index = playlist.findIndex(s => s.id === song.id);
      setCurrentSongIndex(index >= 0 ? index : 0);
      setPlaylistName(name);
    }

    setCurrentSong(song);
    setPosition(0);
    setJSON("positionRealtime", 0);
    router.push("/player");
  };

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = async () => {
    if (!soundRef.current) return;

    const status = await soundRef.current.getStatusAsync();
    if (!status.isLoaded) return;

    if (status.isPlaying) await soundRef.current.pauseAsync();
    else await soundRef.current.playAsync();
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
    if (autoPlay) isInitialLoadRef.current = false;
  };

  const previous = async () => {
    if (!library.length) return;
    const prevIndex = (currentSongIndex - 1 + library.length) % library.length;
    setCurrentSongIndex(prevIndex);
    setCurrentSong(library[prevIndex]);
    setPosition(0);
    isInitialLoadRef.current = false;
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