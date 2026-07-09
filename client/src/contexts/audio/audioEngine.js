export class AudioEngine {
    constructor() {
        this.audio = null;
        this._listeners = {};
    }

    ensureElement(url) {
        if (!this.audio) {
            this.audio = new Audio(url);
            this.audio.crossOrigin = "anonymous";
        } else {
            this.audio.src = url;
        }
        return this.audio;
    }

    load(url, { volume = 1, startPosition = 0 } = {}) {
        const el = this.ensureElement(url);
        el.volume = volume;
        el.currentTime = startPosition;
        return el;
    }

    attachListeners({ onLoaded, onTimeUpdate, onEnded, onPlay, onPause }) {
        this.detachListeners();
        this._listeners = { loadedmetadata: onLoaded, timeupdate: onTimeUpdate, ended: onEnded, play: onPlay, pause: onPause };
        Object.entries(this._listeners).forEach(([event, handler]) => {
            if (handler) this.audio.addEventListener(event, handler);
        });
    }

    detachListeners() {
        if (!this.audio) return;
        Object.entries(this._listeners).forEach(([event, handler]) => {
            if (handler) this.audio.removeEventListener(event, handler);
        });
        this._listeners = {};
    }

    play() { return this.audio?.play(); }
    pause() { this.audio?.pause(); }

    stop() {
        if (!this.audio) return;
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    seek(pos) { if (this.audio) this.audio.currentTime = pos; }
    setVolume(vol) { if (this.audio) this.audio.volume = vol; }

    get isPaused() { return this.audio ? this.audio.paused : true; }
    get currentTime() { return this.audio?.currentTime ?? 0; }
    get duration() { return this.audio?.duration || 0; }
}