export const LOUDNESS_PRESETS = {
    quiet: -20,
    normal: -14,
    loud: -8,
} as const;

export type LoudnessPresetKey = keyof typeof LOUDNESS_PRESETS;

export const DEFAULT_LOUDNESS_PRESET: LoudnessPresetKey = "normal";