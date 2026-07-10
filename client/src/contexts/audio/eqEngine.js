import { EQ_BANDS } from "../../utils/defaultEQ";

export class EQEngine {
    constructor() {
        this.ctx = null;
        this.source = null;
        this.filters = [];
        this.masterGain = null;
        this.currentElement = null;
    }

    async unlock() {
        if (!this.ctx) {
            this.ctx = new (
                window.AudioContext ||
                window.webkitAudioContext
            )();
        }
        if (this.ctx.state === "suspended") await this.ctx.resume();
    }

    init(audioElement, gains, extraNode = null) {
        if (!audioElement || !this.ctx) return;

        if (!this.source || this.currentElement !== audioElement) {
            if (this.source) {
                try {
                    this.source.disconnect();
                } catch {}
            }
            this.source =this.ctx.createMediaElementSource(audioElement);
            this.currentElement = audioElement;
        }

        this.filters.forEach(f => {
            try {
                f.disconnect();
            } catch {}
        });

        if (this.masterGain) {
            try {
                this.masterGain.disconnect();
            } catch {}
        }

        this.filters = EQ_BANDS.map(band => {
            const filter =this.ctx.createBiquadFilter();
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

        const last = this.filters[this.filters.length - 1];

        if (extraNode) {
            last.connect(extraNode);
            extraNode.connect(this.masterGain);
        }
        else {
            last.connect(this.masterGain);
        }

        this.masterGain.connect(this.ctx.destination);
    }

    updateGain(label,value){
        const index = EQ_BANDS.findIndex(b => b.label === label);
        if (index >=0 && this.filters[index]) this.filters[index].gain.value=value;
    }

    reset() {
        this.filters.forEach(filter => filter.gain.value=0);
    }
}