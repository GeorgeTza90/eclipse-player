import { Song } from "./songs";

export interface AudioContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  library: Song[];
  playlistName: string;
  duration: number;
  position: number;
  volume: number;
  EQGain: Record<string, number>;
  playSong: (song: Song, playlist?: Song[], name?: string) => void;
  togglePlay: () => void;
  stop: () => void;
  next: () => void;
  previous: () => void;
  setVolume: (vol: number) => void;
  seekTo: (pos: number) => void;
  setLibrary: (library: Song[]) => void;
  setEQGain: (label: string, value: number) => void;
  resetEQ: () => void;
}

export type AudioPlayerProps = {
  onToggleExtention?: (extention: "Playlist" | "Lyrics" | "Equalizer") => void;
}

export type EQGainType = { [key: string]: number };

export interface EQBand {
  label: string;
  value: number;
}