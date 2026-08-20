import { EQ_BANDS } from "@/utils/defaultEQ";
import type { EQGains } from "@/types/player.types";

export class EQEngine {
    ctx: AudioContext | null;
    source: MediaElementAudioSourceNode | null;
    filters: BiquadFilterNode[];
    masterGain: GainNode | null;
    currentElement: HTMLAudioElement | null;
    initialized: boolean;

    constructor() {
        this.ctx = null;
        this.source = null;
        this.filters = [];
        this.masterGain = null;
        this.currentElement = null;
        this.initialized = false;
    }

    async unlock(): Promise<void> {
        if (!this.ctx) {
            this.ctx = new AudioContext();
        }

        if (this.ctx.state === "suspended") {
            await this.ctx.resume();
        }
    }

    init(
        audioElement: HTMLAudioElement,
        gains: EQGains,
        extraNode: AudioNode | null = null
    ): void {
        if (!this.ctx) return;

        if (!this.source) {
            this.source = this.ctx.createMediaElementSource(audioElement);
            this.currentElement = audioElement;
        }

        this.filters.forEach((filter) => {
            filter.disconnect();
        });

        this.masterGain?.disconnect();

        this.filters = EQ_BANDS.map((band) => {
            const filter = this.ctx!.createBiquadFilter();

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

        const lastFilter = this.filters[this.filters.length - 1];

        if (extraNode) {
            lastFilter.connect(extraNode);
            extraNode.connect(this.masterGain);
        } else {
            lastFilter.connect(this.masterGain);
        }

        this.masterGain.connect(this.ctx.destination);

        this.initialized = true;
    }

    updateGain(label: string, value: number): void {
        const index = EQ_BANDS.findIndex(
            (band) => band.label === label
        );

        if (index >= 0 && this.filters[index]) {
            this.filters[index].gain.value = value;
        }
    }

    reset(): void {
        this.filters.forEach((filter) => {
            filter.gain.value = 0;
        });
    }
}