import { useEffect, useRef } from "react";
import { getJSON, setJSON } from "@/utils/localStorageManager";
import { useToast } from "@/contexts/ToastContextWeb";
import type { AudioPlayerProps } from "@/types/audio.types";

export const useAudioPlayer = ({
    currentSong, volume, audioEngineRef, isInitialLoadRef, nextRef,
    setDuration, setPositionRealtime, setIsPlaying,
}: AudioPlayerProps): void => {
    const lastSavedPosRef = useRef<number>(-1);
    const { showToast } = useToast();
    
    useEffect(() => {
        if (!currentSong) return;

        const engine = audioEngineRef.current;
        if (!engine) return;

        const savedPosition = isInitialLoadRef.current ? getJSON<number>("positionRealtime", 0) : 0;

        engine.load(currentSong.url, { volume, startPosition: savedPosition });

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
        currentSong, audioEngineRef, isInitialLoadRef, nextRef,
        setDuration, setPositionRealtime, setIsPlaying, showToast,
    ]);
    
    useEffect(() => {
        audioEngineRef.current?.setVolume(volume);
    }, [volume, audioEngineRef]);
};