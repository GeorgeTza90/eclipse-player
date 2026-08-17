import { MouseEvent } from "react";
import type { LoudnessPreset } from "./audio.types";
import type { Song } from "./songs.types";

export interface GeneralButtonProps {
    loading?: boolean;
    isLogin?: boolean;
    title?: string;
    onClick: () => void;
    disabled?: boolean;
    width?: string; 
    groupsKind?: string;
    type?: string;
    message?: string;
    size?: string | number;
    active?: boolean;
}

export interface PlayButtonProps {
    type?: string;
    onClick?: (event:MouseEvent<HTMLButtonElement>) => void;
    size?: string | number;
}

export interface ToggleButtonProps {
    heading: string;
    isBarMode?: boolean;
    value: boolean;
    onChange: (value: boolean) => void;
    inActive?: boolean;    
}

export interface LoudnessButtonProps {
    heading: string;    
    value: LoudnessPreset;
    onChange: (value: LoudnessPreset) => void;
    disabled?: boolean;    
}

export interface PlaylistButtonProps {
    song: Song;    
}

export interface ArtistButtonProps {
    artist:string;
    size: string | number;
    marginTop?: string | number;
}

export interface BackButtonProps {
    navTo: string;
}

export interface DeleteButtonProps {
    playlistId: number;
    onDeleted: () => void;
    songId?: number
}