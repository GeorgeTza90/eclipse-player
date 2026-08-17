import { Song } from "./songs.types";

export interface LyricsProps {
    currentSong: Song;
    onClick?: () => void;
}