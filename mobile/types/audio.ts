import { Song } from '@/types/songs'

export type AudioContextType = {
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