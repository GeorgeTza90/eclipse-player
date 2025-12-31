import { createContext, useState, useContext, useEffect, useRef } from "react";
import { getJSON, setJSON } from "../utils/localStorageManager";

const AudioContext = createContext(undefined);

export const AudioProvider = ({ children }) => {
  /* ---------------- PLAYER SETTINGS ---------------- */
  const [library, setLibrary] = useState(() => getJSON("audio_library", []));
  const [playlistName, setPlaylistName] = useState(() => getJSON("audio_playlistName", ""));
  const [currentSongIndex, setCurrentSongIndex] = useState(() => getJSON("audio_currentSongIndex", 0));
  const [currentSong, setCurrentSong] = useState(() => getJSON("audio_currentSong", null));
  const [volume, setVolumeState] = useState(() => getJSON("audio_volume", 1));
  const [positionRealtime, setPositionRealtime] = useState(0);
  const audioRef = useRef(null);
  const isInitialLoadRef = useRef(true);

  /* ---------------- LOCAL STORAGE ---------------- */
  useEffect(() => setJSON("audio_library", library), [library]);
  useEffect(() => setJSON("audio_playlistName", playlistName), [playlistName]);
  useEffect(() => setJSON("audio_currentSongIndex", currentSongIndex), [currentSongIndex]);

  useEffect(() => {
    if (currentSong) setJSON("audio_currentSong", currentSong)
  }, [currentSong]);

  useEffect(() => {
    setJSON("audio_volume", volume);
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  /* ---------------- PLAYER FUNCTIONALITY ---------------- */
  useEffect(() => {
    if (!currentSong) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(currentSong.url);
    } else {
      audioRef.current.src = currentSong.url;
    }

    audioRef.current.volume = volume;

    if (!isInitialLoadRef.current) {
      audioRef.current.play().catch(console.warn);
    }

    const updateTime = () =>
      setPositionRealtime(audioRef.current?.currentTime ?? 0);

    const handleEnded = () => next();

    audioRef.current.addEventListener("timeupdate", updateTime);
    audioRef.current.addEventListener("ended", handleEnded);

    isInitialLoadRef.current = false;

    return () => {
      audioRef.current?.removeEventListener("timeupdate", updateTime);
      audioRef.current?.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  const playSong = (song, playlist, name = "") => {
    if (playlist) {
      setLibrary(playlist);
      const index = playlist.findIndex((s) => s.id === song.id);
      setCurrentSongIndex(index >= 0 ? index : 0);
      setPlaylistName(name);
    }
    setCurrentSong(song);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) audioRef.current.play().catch(console.warn);
    else audioRef.current.pause();
  };

  const stop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const next = () => {
    setCurrentSongIndex((index) => {
      const nextIndex = (index + 1) % library.length;
      setCurrentSong(library[nextIndex]);
      return nextIndex;
    });
  };

  const previous = () => {
    if (!library.length) return;
    const prevIndex = (currentSongIndex - 1 + library.length) % library.length;
    setCurrentSongIndex(prevIndex);
    setCurrentSong(library[prevIndex]);
  };

  const setVolume = (vol) => setVolumeState(vol);

  const seekTo = (pos) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = pos;
    setPositionRealtime(pos);
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        isPlaying: audioRef.current?.paused === false,
        library,
        playlistName,
        duration: audioRef.current?.duration || 0,
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
    </AudioContext.Provider >
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within AudioProvider");
  return context;
};
