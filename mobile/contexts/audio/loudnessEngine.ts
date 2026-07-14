import { Song } from "@/types/songs";

export function computeLoudnessGain(song: Song | null, targetLufs: number): number {
    const integratedLufs = song?.loudness?.integratedLufs;
    const truePeak = song?.loudness?.truePeak;

    if (integratedLufs == null || truePeak == null) return 1;

    const desiredGainDb = targetLufs - integratedLufs;
    const maxSafeGainDb = 0 - truePeak;
    const appliedGainDb = Math.min(desiredGainDb, maxSafeGainDb);

    const linearGain = Math.pow(10, appliedGainDb / 20);
    
    return Math.min(Math.max(linearGain, 0), 1);
}