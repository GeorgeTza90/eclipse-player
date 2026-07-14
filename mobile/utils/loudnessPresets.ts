export const LOUDNESS_PRESETS = {
    quiet: -16,
    normal: -14,
    loud: -12,
} as const;

export type LoudnessPresetKey = keyof typeof LOUDNESS_PRESETS;

export const DEFAULT_LOUDNESS_PRESET: LoudnessPresetKey = "normal";