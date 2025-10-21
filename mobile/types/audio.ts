import { Song } from '@/types/songs'

export type AudioContextType = {
    currentSong: Song | null;
    isPlaying: boolean;
    library: Song[];
    playSong: (song: Song, playlist?: Song[], playlistName?: string) => void;
    togglePlay: () => void;
    stop: () => void;
    next: () => void;
    previous: () => void;
    setVolume: (vol: number) => void;
    seekTo: (position: number) => void;
    position: number;
    duration: number;
    volume: number;
    playlistName: string,
};