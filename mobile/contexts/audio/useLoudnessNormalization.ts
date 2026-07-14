import { useMemo } from "react";
import { LOUDNESS_PRESETS } from "@/utils/loudnessPresets";
import { computeLoudnessGain } from "./loudnessEngine";
import { UseLoudnessNormalizationProps } from "@/types/audio";

export function useLoudnessNormalization({
    currentSong, loudnessPreset, normalization,
}: UseLoudnessNormalizationProps): number {
    return useMemo(() => {
        if (!normalization) return 1;
        return computeLoudnessGain(currentSong, LOUDNESS_PRESETS[loudnessPreset]);
    }, [currentSong, loudnessPreset, normalization]);
}