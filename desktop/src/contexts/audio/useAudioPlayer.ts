import { useEffect, useRef } from "react";
import { getJSON, setJSON, getBool } from "@/utils/localStorageManager";
import { useToast } from "@/contexts/ToastContextWeb";
import { useLatestRef } from "@/hooks/useLatestRef";
import { LOUDNESS_PRESETS } from "@/utils/loudnessPresets";
import { recordPlay } from "@/services/PostService";
import type { AudioPlayerProps } from "@/types/audio.types";

const PLAY_THRESHOLD_SECONDS = 30;
const PLAY_THRESHOLD_PERCENTAGE = 0.5;

export const useAudioPlayer = ({
    currentSong, volume, audioEngineRef, eqEngineRef, loudnessEngineRef,
    EQGain, normalization, loudnessPreset, isInitialLoadRef, nextRef,
    setDuration, setPositionRealtime, setIsPlaying,
}: AudioPlayerProps): void => {
    const lastSavedPosRef = useRef<number>(-1);
    const playRecordedRef = useRef<boolean>(false);
    const { showToast } = useToast();

    const EQGainRef = useLatestRef(EQGain);
    const volumeRef = useLatestRef(volume);
    const normalizationRef = useLatestRef(normalization);
    const loudnessPresetRef = useLatestRef(loudnessPreset);

    useEffect(() => {
        if (!currentSong) return;

        const engine = audioEngineRef.current;
        if (!engine) return;

        // Αν είναι πραγματικό restore (reload), κράτα το ήδη-καταγεγραμμένο play flag.
        // Αν είναι πραγματική αλλαγή τραγουδιού, reset σε false.
        playRecordedRef.current = isInitialLoadRef.current ? getBool("playRecorded", false) : false;
        setJSON("playRecorded", playRecordedRef.current);

        const savedPosition = isInitialLoadRef.current ? getJSON<number>("positionRealtime", 0) : 0;

        const audioElement = engine.load(currentSong.url, { volume: volumeRef.current, startPosition: savedPosition });

        const eq = eqEngineRef.current;
        const loudness = loudnessEngineRef.current;

        if (eq && loudness && eq.ctx && !eq.initialized) {
            const loudnessGainNode = loudness.init(eq.ctx);
            eq.init(audioElement, EQGainRef.current, loudnessGainNode);

            if (normalizationRef.current) {
                loudness.applyForSong(currentSong, LOUDNESS_PRESETS[loudnessPresetRef.current]);
            }
        }

        engine.attachListeners({
            onLoaded: () => setDuration(engine.duration),

            onTimeUpdate: () => {
                const pos = engine.currentTime;
                setPositionRealtime(pos);

                const flooredPos = Math.floor(pos);

                if (flooredPos !== lastSavedPosRef.current) {
                    setJSON("positionRealtime", pos);
                    lastSavedPosRef.current = flooredPos;
                }

                if (!playRecordedRef.current && engine.duration > 0 && !currentSong.isPrivate) {
                    const threshold = Math.min(PLAY_THRESHOLD_SECONDS, engine.duration * PLAY_THRESHOLD_PERCENTAGE);

                    if (pos >= threshold) {
                        playRecordedRef.current = true;
                        setJSON("playRecorded", true);
                        recordPlay(Number(currentSong.id), Math.floor(pos), Math.floor(engine.duration))
                            .catch(console.warn);
                    }
                }
            },

            onEnded: () => nextRef.current?.(),
            onPlay: () => setIsPlaying(true),
            onPause: () => setIsPlaying(false),
            onError: () => {
                setIsPlaying(false);
                showToast(`Failed to play "${currentSong.title}"`, "error");
                nextRef.current?.();
            },
        });

        if (!isInitialLoadRef.current) {
            engine.play()?.catch(console.warn);
        }

        isInitialLoadRef.current = false;

        return () => engine.detachListeners();
    }, [
        currentSong, audioEngineRef, eqEngineRef, loudnessEngineRef,
        isInitialLoadRef, nextRef,
        setDuration, setPositionRealtime, setIsPlaying, showToast,
        EQGainRef, volumeRef, normalizationRef, loudnessPresetRef,
    ]);

    useEffect(() => {
        audioEngineRef.current?.setVolume(volume);
    }, [volume, audioEngineRef]);
};