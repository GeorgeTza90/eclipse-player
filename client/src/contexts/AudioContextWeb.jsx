import { createContext, useState, useContext, useEffect, useRef } from "react";
import { getJSON, setJSON } from "../utils/localStorageManager";
import { EQ_BANDS, DEFAULT_EQ } from "../utils/defaultEQ";

const AudioContext = createContext(undefined);

export const AudioProvider = ({ children }) => {
  const [library, setLibrary] = useState(() => getJSON("audio_library", []));
  const [playlistName, setPlaylistName] = useState(() => getJSON("audio_playlistName", ""));
  const [currentSongIndex, setCurrentSongIndex] = useState(() => getJSON("audio_currentSongIndex", 0));
  const [currentSong, setCurrentSong] = useState(() => getJSON("audio_currentSong", null));
  const [volume, setVolumeState] = useState(() => getJSON("audio_volume", 1));
  const [positionRealtime, setPositionRealtime] = useState(() => getJSON("positionRealtime", 0));
  const [EQGain, setEQGain] = useState(() => getJSON("EQGain", DEFAULT_EQ));

  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const sourceRef = useRef(null);
  const filtersRef = useRef([]);
  const masterGainRef = useRef(null);
  const isInitialLoadRef = useRef(true);

  /* --- LOCAL STORAGE --- */
  useEffect(() => setJSON("audio_library", library), [library]);
  useEffect(() => setJSON("audio_playlistName", playlistName), [playlistName]);
  useEffect(() => setJSON("audio_currentSongIndex", currentSongIndex), [currentSongIndex]);
  useEffect(() => setJSON("EQGain", EQGain), [EQGain]);
  useEffect(() => { if (currentSong) setJSON("audio_currentSong", currentSong); }, [currentSong]);
  useEffect(() => { 
    setJSON("audio_volume", volume); 
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  /* --- AUDIO CONTEXT --- */
  const unlockAudioContext = async () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") await audioCtxRef.current.resume();
  };

  const initEQ = () => {
    if (!audioRef.current) return;
    if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    if (!sourceRef.current) sourceRef.current = audioCtxRef.current.createMediaElementSource(audioRef.current);

    try {
      sourceRef.current.disconnect();
      filtersRef.current.forEach(f => f.disconnect());
      if (masterGainRef.current) masterGainRef.current.disconnect();
    } catch (e) { console.log(e); }

    filtersRef.current = EQ_BANDS.map(band => {
      const filter = audioCtxRef.current.createBiquadFilter();
      filter.type = "peaking";
      filter.frequency.value = band.value; // **ΑΡΙΘΜΟΣ**
      filter.Q.value = 1;
      filter.gain.value = EQGain[band.label] ?? 0;
      return filter;
    });

    masterGainRef.current = audioCtxRef.current.createGain();
    masterGainRef.current.gain.value = 0.7;

    sourceRef.current.connect(filtersRef.current[0]);
    for (let i = 0; i < filtersRef.current.length - 1; i++) {
      filtersRef.current[i].connect(filtersRef.current[i + 1]);
    }
    filtersRef.current[filtersRef.current.length - 1].connect(masterGainRef.current);
    masterGainRef.current.connect(audioCtxRef.current.destination);
  };

  /* --- EQ FUNCTIONS --- */
  const updateEQGain = (label, value) => {
    const filter = filtersRef.current.find(f => f.frequency.value === EQ_BANDS.find(b => b.label === label).value);
    if (filter) filter.gain.value = value;
    setEQGain(prev => ({ ...prev, [label]: value }));
  };

  const resetEQ = () => {
    const resetValues = {};
    EQ_BANDS.forEach(band => { resetValues[band.label] = 0; });
    filtersRef.current.forEach(filter => { filter.gain.value = 0; });
    setEQGain(resetValues);
  };

  /* --- PLAYER --- */
  useEffect(() => {
    if (!currentSong) return;
    const savedPosition = parseFloat(getJSON("positionRealtime", 0)) || 0;

    if (!audioRef.current) {
      audioRef.current = new Audio(currentSong.url);
      audioRef.current.crossOrigin = "anonymous";
    } else audioRef.current.src = currentSong.url;

    audioRef.current.volume = volume;
    audioRef.current.currentTime = savedPosition;

    const handleLoaded = () => initEQ();
    const updateTime = () => {
      const pos = audioRef.current?.currentTime ?? 0;
      setPositionRealtime(pos);
      setJSON("positionRealtime", pos);
    };
    const handleEnded = () => next();

    audioRef.current.addEventListener("loadedmetadata", handleLoaded);
    audioRef.current.addEventListener("timeupdate", updateTime);
    audioRef.current.addEventListener("ended", handleEnded);

    if (!isInitialLoadRef.current) audioRef.current.play().catch(console.warn);
    isInitialLoadRef.current = false;

    return () => {
      audioRef.current?.removeEventListener("loadedmetadata", handleLoaded);
      audioRef.current?.removeEventListener("timeupdate", updateTime);
      audioRef.current?.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  const playSong = async (song, playlist, name = "") => {
    await unlockAudioContext();
    if (playlist) {
      setLibrary(playlist);
      const index = playlist.findIndex(s => s.id === song.id);
      setCurrentSongIndex(index >= 0 ? index : 0);
      setPlaylistName(name);
    }
    setCurrentSong(song);
    setPositionRealtime(0);
    setJSON("positionRealtime", 0);
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;
    await unlockAudioContext();
    if (audioRef.current.paused) audioRef.current.play().catch(console.warn);
    else audioRef.current.pause();
  };

  const stop = () => { if (!audioRef.current) return; audioRef.current.pause(); audioRef.current.currentTime = 0; };
  const next = () => { setCurrentSongIndex(i => { const nextI = (i + 1) % library.length; setCurrentSong(library[nextI]); setPositionRealtime(0); setJSON("positionRealtime", 0); return nextI; }); };
  const previous = () => { if (!library.length) return; const prevI = (currentSongIndex - 1 + library.length) % library.length; setCurrentSongIndex(prevI); setCurrentSong(library[prevI]); setPositionRealtime(0); setJSON("positionRealtime", 0); };

  const setVolume = vol => setVolumeState(vol);
  const seekTo = pos => { if (!audioRef.current) return; audioRef.current.currentTime = pos; setPositionRealtime(pos); };

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
        EQGain,
        playSong,
        togglePlay,
        stop,
        next,
        previous,
        setVolume,
        seekTo,
        setLibrary,
        setEQGain: updateEQGain,
        resetEQ,
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