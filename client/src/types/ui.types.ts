import type { MouseEvent, ReactNode } from "react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { LoudnessPreset } from "./audio.types";
import type { EQGains, Presets } from "./player.types";
import type { Song } from "./songs.types";

// BUTTONS
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
    type: "play" | "pause" | "stop" | "previous" | "next";
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

// CIRCLE
export interface CircleStyleProps {
    size: number;
    top: number;
    left: number;
    zIndex: number;
    intensity: number;
    heightOffset: number;
    shadowColor:string;
    goRGB: boolean;
    coloredGlow: boolean;
    gradientColors: string[];    
}

export interface CircleProps {
    size: number;
    top: number;
    left?: number;
    shadowColor?: string;
    color1?: string;
    color2?: string;
    colors?: string[];
    intensity: number;
    heightOffset?: number;
    zIndex?: number;
}

// INPUT
export interface FormInputProps {
    type: string;
    name?: string;
    placeholder?: string;
    value?: string;
    onChangeText: (value: string) => void;
    isForm?: boolean;
}

export interface PasswordInputProps {
    value: string;
    show: boolean;
    placeholder?: string;
    onChangeText: (value: string) => void;
    setShow: Dispatch<SetStateAction<boolean>>;
}

export interface SearchInputProps {
    placeholder?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

// LINKS
export interface MediaLinkProps {
    platform: string;
    link: string;
}

export type ArtistMedia = Record<string, string>;

// LOADER
export interface LoaderProps {
    text: string;
    size?: string;
}

export interface LoadingMessageProps {
    message?: string;
    height?: string;
}

// MODAL
export interface AddPlaylistModalProps {
    visible: boolean;
    onClose: () => void;
    onCreated?: () => void;
}

export interface AddPresetModalProps {
    visible: boolean;
    onClose: () => void;
    onCreated?: () => void;
    eqGains: EQGains;
}

export interface ConfirmModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export interface EditPlaylistModalProps {
    visible: boolean;
    onClose: () => void;
    onUpdated?: (title: string, description: string) => void;
    currentTitle: string;
    currentDescription: string;
    playlistId: number;
}

export interface Preset {
    id: number;
    title: string;
    preset: EQGains;
}

export interface UpdatePresetModalProps {
    visible: boolean;
    onClose: () => void;
    onCreated?: () => void;
    presetNew: Presets;
    newEQ: EQGains;
}

// TEASER
export interface TeaserProps {
    link: string;
    source: string;
    download?: boolean;
    video: boolean;
}


// TOAST
export type ToastType = "info" | "success" | "warning" | "error";

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

export interface ToastProps {
    message: string;
    type?: ToastType;
    onClose: () => void;
    duration?: number;
}

export interface ToastItemProps {    
    toast: Toast;    
    onClose: (id: string) => void;
}

export interface ToastContainerProps {
    toasts: Toast[];    
    closeToast: (id: string) => void;    
}

export interface ToastProviderProps {
    children: ReactNode;
}

export interface ToastContextValue {
    showToast: (message: string, type?: ToastType, duration?: number) => void;
}

// ERROR
export interface ErrorStyleProps {
    height?: string | number;
    visible?: boolean;
}

export interface AuthFormErrorProps {
    message: string | null;
}
export interface ErrorMessageProps {
    message: string
    height: string | number
}