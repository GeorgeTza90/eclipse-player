import { useEffect } from "react";
import { LOUDNESS_PRESETS } from "../../utils/loudnessPresets";

export function useLoudnessNormalization({
    loudnessEngineRef, currentSong, loudnessPreset, normalization,
}) {
    useEffect(() => {
        if (!loudnessEngineRef.current?.gainNode) return; // graph όχι ready ακόμα

        if (!normalization) {
            loudnessEngineRef.current.bypass();
            return;
        }

        loudnessEngineRef.current.applyForSong(currentSong, LOUDNESS_PRESETS[loudnessPreset]);
    }, [currentSong, loudnessPreset, normalization]);
}