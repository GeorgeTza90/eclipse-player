import { createContext, useState, useContext, useEffect, useRef } from "react";

const AudioContext = createContext(undefined);

export const AudioProvider = ({ children }) => {
  const [library, setLibrary] = useState(() => {
    const saved = localStorage.getItem("audio_library");
    return saved ? JSON.parse(saved) : [];
  });
  const [playlistName, setPlaylistName] = useState(() => localStorage.getItem("audio_playlistName") || "");
  const [currentSongIndex, setCurrentSongIndex] = useState(() => {
    const saved = localStorage.getItem("audio_currentSongIndex");
    return saved ? Number(saved) : 0;
  });
  const [currentSong, setCurrentSong] = useState(() => {
    const saved = localStorage.getItem("audio_currentSong");
    return saved ? JSON.parse(saved) : null;
  });
  const [volume, setVolumeState] = useState(() => {
    const saved = localStorage.getItem("audio_volume");
    return saved ? Number(saved) : 1;
  });
  const [positionRealtime, setPositionRealtime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("audio_library", JSON.stringify(library));
  }, [library]);

  useEffect(() => {
    localStorage.setItem("audio_playlistName", playlistName);
  }, [playlistName]);

  useEffect(() => {
    localStorage.setItem("audio_currentSongIndex", currentSongIndex);
  }, [currentSongIndex]);

  useEffect(() => {
    if (currentSong) localStorage.setItem("audio_currentSong", JSON.stringify(currentSong));
  }, [currentSong]);

  useEffect(() => {
    localStorage.setItem("audio_volume", volume);
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (currentSong) {
      if (!audioRef.current) audioRef.current = new Audio(currentSong.url);
      else audioRef.current.src = currentSong.url;

      audioRef.current.volume = volume;
      audioRef.current.play().catch(console.warn);

      const updateTime = () => setPositionRealtime(audioRef.current?.currentTime ?? 0);
      audioRef.current.addEventListener("timeupdate", updateTime);

      return () => audioRef.current?.removeEventListener("timeupdate", updateTime);
    }
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
