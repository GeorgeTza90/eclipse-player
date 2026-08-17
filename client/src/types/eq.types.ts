export interface EqualizerProps {
    color: string;
}

export interface EQBand {
    label: string;
    value: number;
}

export type EQGains = Record<string, number>;