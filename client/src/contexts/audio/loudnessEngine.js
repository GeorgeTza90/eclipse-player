export class LoudnessEngine {
    constructor() {
        this.gainNode = null;
    }

    init(audioCtx) {
        if (!audioCtx) throw new Error("LoudnessEngine: missing AudioContext");
        if (!this.gainNode) {
            this.gainNode =audioCtx.createGain();
            this.gainNode.gain.value = 1;
        }
        return this.gainNode;
    }

    computeGain(integratedLufs, truePeak, targetLufs) {
        if (integratedLufs == null || truePeak == null ) return 1;
        const desiredGainDb = targetLufs - integratedLufs;
        const maxSafeGainDb = -truePeak;
        const appliedGainDb = Math.min(desiredGainDb, maxSafeGainDb);
        return Math.pow( 10, appliedGainDb / 20);
    }

    applyForSong(song, targetLufs) {
        const gain =
            this.computeGain(
                song?.loudness?.integratedLufs,
                song?.loudness?.truePeak,
                targetLufs
            );
        this.setGain(gain);
    }

    setGain(linearGain) {
        if (!this.gainNode) return;
        const now = this.gainNode.context.currentTime;
        this.gainNode.gain.cancelScheduledValues(now);
        this.gainNode.gain.setTargetAtTime(linearGain, now, 0.05);
    }

    bypass() {
        this.setGain(1);
    }
}