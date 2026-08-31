export const PLAY_THRESHOLD_SECONDS = 30;

export const PLAY_THRESHOLD_PERCENTAGE = 0.5;

export const RANGE_CONFIG: Record<string, { days: number | null; groupFormat: string }> = {
    "7d":  { days: 7,   groupFormat: "%Y-%m-%d" },
    "1m":  { days: 30,  groupFormat: "%Y-%m-%d" },
    "3m":  { days: 90,  groupFormat: "%x-%v" },
    "all": { days: null, groupFormat: "%Y-%m" },
};