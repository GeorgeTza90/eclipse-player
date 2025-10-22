import { useRouter } from 'expo-router';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Song } from '@/types/songs';
import { AudioContextType } from '@/types/audio';

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [library, setLibrary] = useState<Song[]>([]);  
  const [playlistName, setPlaylistName] = useState<string>("");
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [volume, setVolumeState] = useState<number>(1);
  const [positionRealtime, setPositionRealtime] = useState(0);

  const router = useRouter();

  const player = useAudioPlayer(currentSong ? currentSong.url : null);
  const status = useAudioPlayerStatus(player);

  const isPlaying = status?.playing ?? false;
  const duration = (player?.duration ?? 0) * 1000;

  player.currentTime

  // Play when currentSong changes
  useEffect(() => {
    if (currentSong && player) {
      try { player.play(); } 
      catch (err) { console.warn('Audio play error:', err); }
    }
  }, [currentSong, player]);

  // Realtime position updater
  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      if (!player) return;
      setPositionRealtime((player.currentTime ?? 0) * 1000);
    }, 250); 

    return () => clearInterval(interval);
  }, [player]);

  const playSong = (song: Song, playlist?: Song[], name?: string) => {
    if (!song) return;

    if (playlist) {
      setLibrary(playlist);
      const index = playlist.findIndex((s) => s.id === song.id);
      setCurrentSongIndex(index >= 0 ? index : 0);
      if (name) setPlaylistName(name);
    }

    setCurrentSong(song);

    setTimeout(() => {
      if (currentSong) router.push('/player');
    }, 50);

    setTimeout(() => {
      try { player?.play(); } 
      catch (err) { console.warn('Audio play error:', err); }
    }, 100);
  };

  const togglePlay = () => {
    if (!player) return;
    if (isPlaying) player.pause();
    else player.play();
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

  const setVolume = (vol: number) => {
    setVolumeState(vol);
    if (player) player.volume = vol;
  };

  const seekTo = (positionMillis: number) => {
    if (!player || duration <= 0) return;
    player.seekTo(positionMillis / 1000);
    setPositionRealtime(positionMillis);
  };

  // Auto-next when song ends
  useEffect(() => {
    if (!status) return;
    if (!status.playing && status.currentTime && status.duration && status.currentTime >= status.duration) {
      next();
    }
  }, [status?.playing, status?.currentTime]);

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        isPlaying,
        library,
        playlistName,
        playSong,
        togglePlay,
        stop,
        next,
        previous,
        setVolume,
        seekTo,        
        position: positionRealtime, 
        duration,
        volume,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
};
