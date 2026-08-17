import { User } from "./auth.types";
import { Song } from "./songs.types";

export interface TrackItemProps {
    track: Song;
    index: number;
    onPress: (track: Song) => void;
    user: User | null;
    isPrivate: boolean;
}