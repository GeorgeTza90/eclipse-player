import type { EQGains } from "./eq.types";

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
    presetNew: Preset | null;
    newEQ: EQGains;
}