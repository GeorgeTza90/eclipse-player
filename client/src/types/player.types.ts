import { Song } from "./songs.types";

export interface AudioPlayerProps {
    onToggleExtention: (key: Extention) => void;
}

export interface LyricsProps {
    currentSong: Song;
    onClick?: () => void;
}

export type Extention = "Playlist" | "Lyrics" | "Equalizer"