import { AudioPlayer } from "expo-audio";
import { AudioEngineListeners } from "@/types/audio";

const POLL_INTERVAL_MS = 200;
const END_THRESHOLD_SECONDS = 0.25;

export class AudioEngine {
    private player: AudioPlayer | null = null;
    private intervalId: ReturnType<typeof setInterval> | null = null;
    private listeners: AudioEngineListeners = {};
    private hasFiredEnded = false;
    private wasPlaying = false;

    attach(player: AudioPlayer, listeners: AudioEngineListeners = {}) {
        this.release();

        this.player = player;
        this.listeners = listeners;
        this.hasFiredEnded = false;
        this.wasPlaying = player.playing;

        this.intervalId = setInterval(() => this.poll(), POLL_INTERVAL_MS);
    }

    private poll() {
        if (!this.player) return;
        const { currentTime, duration, playing } = this.player;

        this.listeners.onTimeUpdate?.(currentTime, duration);

        if (playing !== this.wasPlaying) {
            this.wasPlaying = playing;
            this.listeners.onPlayingChange?.(playing);
        }

        const reachedEnd = duration > 0 && currentTime >= duration - END_THRESHOLD_SECONDS && !playing;
        if (reachedEnd && !this.hasFiredEnded) {
            this.hasFiredEnded = true;
            this.listeners.onEnded?.();
        }
    }

    play() { this.player?.play(); }
    pause() { this.player?.pause(); }

    stop() {
        if (!this.player) return;
        this.player.pause();
        this.player.seekTo(0);
    }

    seek(pos: number) { this.player?.seekTo(pos); }
    setVolume(vol: number) { if (this.player) this.player.volume = vol; }

    get isPlaying() { return this.player?.playing ?? false; }
    get currentTime() { return this.player?.currentTime ?? 0; }
    get duration() { return this.player?.duration ?? 0; }

    release() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        if (this.player) this.player = null;
        this.listeners = {};
    }
}