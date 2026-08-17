import { Song } from "./songs.types";

export interface VinylCardSlotProps {
    item: Song;
    type: "private" | "song";
    onNavigate: () => void;
    className?: string;
}

export interface VinylCardProps {
    item: Song;
    onClick: () => void;
    type: "private" | "song";
}

export interface VinylGroupItemProps {
    type: string;
    group: Song[];
}