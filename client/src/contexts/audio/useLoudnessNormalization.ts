import { useEffect } from "react";
import { LOUDNESS_PRESETS } from "@/utils/loudnessPresets";
import type { LoudnessNormalizationProps } from "@/types/audio.types";

export const useLoudnessNormalization = ({
    loudnessEngineRef, currentSong, loudnessPreset, normalization,
}: LoudnessNormalizationProps): void => {

    useEffect(() => {
        const engine = loudnessEngineRef.current;
        if (!engine) return;

        if (!normalization) {
            engine.bypass();
            return;
        }

        engine.applyForSong(currentSong, LOUDNESS_PRESETS[loudnessPreset]);
        
    }, [currentSong, loudnessPreset, normalization, loudnessEngineRef]);
};