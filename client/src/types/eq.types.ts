export interface EqualizerProps {
    color: string;
}

export interface EQBand {
    label: string;
    value: number;
}

export type EQGains = Record<string, number>;

export interface Presets {
    id: number;
    user_id: number;
    title: string;
    preset?: EQGains;
    created_at: Date;
}