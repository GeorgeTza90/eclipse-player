import type { AudioEngineLoadOptions } from "@/types/audio.types";

export class AudioEngine {
    private audio: HTMLAudioElement | null;
    private _listeners: Record<string, (() => void) | undefined>;

    constructor() {
        this.audio = null;
        this._listeners = {};
    }

    get element(): HTMLAudioElement | null {
        return this.audio;
    }

    ensureElement(url: string): HTMLAudioElement {
        if (!this.audio) {
            this.audio = new Audio();
            this.audio.crossOrigin = "anonymous";
            this.audio.src = url;
        } else {
            this.audio.src = url;
        }

        return this.audio;
    }

    load(url: string, { volume = 1, startPosition = 0 }: AudioEngineLoadOptions = {}): HTMLAudioElement {
        const element = this.ensureElement(url);
        element.volume = volume;

        if (startPosition > 0) {
            const setPosition = () => element.currentTime = startPosition;
            
            if (element.readyState >= 1) {
                setPosition();
            } else {
                element.addEventListener("loadedmetadata", setPosition, { once: true });
            }
        }

        return element;
    }

    attachListeners({ onLoaded, onTimeUpdate, onEnded, onPlay, onPause }: {
        onLoaded?: () => void;
        onTimeUpdate?: () => void;
        onEnded?: () => void;
        onPlay?: () => void;
        onPause?: () => void;
    }): void {
        this.detachListeners();

        this._listeners = {
            loadedmetadata: onLoaded,
            timeupdate: onTimeUpdate,
            ended: onEnded,
            play: onPlay,
            pause: onPause,
        };

        Object.entries(this._listeners).forEach(([event, handler]) => {
            if (handler && this.audio) {
                this.audio.addEventListener(event, handler);
            }
        });
    }

    detachListeners(): void {
        if (!this.audio) return;

        Object.entries(this._listeners).forEach(([event, handler]) => {
            if (handler) {
                this.audio?.removeEventListener(event, handler);
            }
        });

        this._listeners = {};
    }

    play(): Promise<void> | undefined {
        return this.audio?.play();
    }

    pause(): void {
        this.audio?.pause();
    }

    stop(): void {
        if (!this.audio) return;
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    seek(position: number): void {
        if (this.audio) this.audio.currentTime = position;
    }

    setVolume(volume: number): void {
        if (this.audio) this.audio.volume = volume;
    }

    get isPaused(): boolean {
        return this.audio?.paused ?? true;
    }

    get currentTime(): number {
        return this.audio?.currentTime ?? 0;
    }

    get duration(): number {
        return this.audio?.duration || 0;
    }
}