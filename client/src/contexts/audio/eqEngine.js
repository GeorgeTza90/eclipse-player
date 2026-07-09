import { EQ_BANDS } from "../../utils/defaultEQ";

export class EQEngine {
    constructor() {
        this.ctx = null;
        this.source = null;
        this.filters = [];
        this.masterGain = null;
    }

    async unlock() {
        if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (this.ctx.state === "suspended") await this.ctx.resume();
    }

    init(audioElement, gains) {
        if (!audioElement || !this.ctx) return;
        if (!this.source) this.source = this.ctx.createMediaElementSource(audioElement);

        try {
            this.source.disconnect();
            this.filters.forEach(f => f.disconnect());
            if (this.masterGain) this.masterGain.disconnect();
        } catch (e) {
            console.log(e);
        }

        this.filters = EQ_BANDS.map(band => {
            const filter = this.ctx.createBiquadFilter();
            filter.type = "peaking";
            filter.frequency.value = band.value;
            filter.Q.value = 1;
            filter.gain.value = gains[band.label] ?? 0;
            return filter;
        });

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.7;

        this.source.connect(this.filters[0]);
        for (let i = 0; i < this.filters.length - 1; i++) {
            this.filters[i].connect(this.filters[i + 1]);
        }
        this.filters[this.filters.length - 1].connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);
    }

    updateGain(label, value) {
        const band = EQ_BANDS.find(b => b.label === label);
        const filter = this.filters.find(f => f.frequency.value === band.value);
        if (filter) filter.gain.value = value;
    }

    reset() {
        this.filters.forEach(filter => { filter.gain.value = 0; });
    }
}