import { createContext, useState, useContext, useEffect, useRef } from "react";

const AudioContext = createContext(undefined);

export const AudioProvider = ({ children }) => {
  const [library, setLibrary] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);
  const [volume, setVolumeState] = useState(1);
  const [positionRealtime, setPositionRealtime] = useState(0);
  const audioRef = useRef(null);

  const isPlaying = audioRef.current?.paused === false;
  const duration = audioRef.current?.duration || 0;

  useEffect(() => {
    if (currentSong) {
      if (!audioRef.current) audioRef.current = new Audio(currentSong.url);
      else audioRef.current.src = currentSong.url;

      audioRef.current.volume = volume;
      audioRef.current.play().catch(console.warn);

      const updateTime = () => setPositionRealtime(audioRef.current?.currentTime ?? 0);
      audioRef.current.addEventListener("timeupdate", updateTime);

      return () => {
        audioRef.current?.removeEventListener("timeupdate", updateTime);
      };
    }
  }, [currentSong]);

  // Updated playSong to accept playlistName
  const playSong = (song, playlist, name = "") => {
    if (playlist) {
      setLibrary(playlist);
      const index = playlist.findIndex((s) => s.id === song.id);
      setCurrentSongIndex(index >= 0 ? index : 0);
      setPlaylistName(name); // store playlist/album name
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

  const setVolume = (vol) => {
    setVolumeState(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  const seekTo = (pos) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = pos;
    setPositionRealtime(pos);
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
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within AudioProvider");
  return context;
};
