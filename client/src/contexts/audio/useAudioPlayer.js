import { useEffect } from "react";
import { getJSON, setJSON } from "../../utils/localStorageManager";

export const useAudioPlayer = ({
    currentSong, volume, 
    audioEngineRef, isInitialLoadRef, nextRef,
    setDuration, setPositionRealtime, setIsPlaying,
}) => {
    useEffect(() => {
        if (!currentSong) return;

        const engine = audioEngineRef.current;
        const savedPosition = isInitialLoadRef.current
        
            ? parseFloat(getJSON("positionRealtime", 0)) || 0
            : 0;

        engine.load(currentSong.url, { volume, startPosition: savedPosition });

        engine.attachListeners({
            onLoaded: () => setDuration(engine.duration),

            onTimeUpdate: () => {
                const pos = engine.currentTime;
                setPositionRealtime(pos);
                setJSON("positionRealtime", pos);
            },

            onEnded: () => {  if (nextRef.current) nextRef.current(); },
            
            onPlay: () => setIsPlaying(true),

            onPause: () => setIsPlaying(false),
        });

        if (!isInitialLoadRef.current) engine.play()?.catch(console.warn);
        isInitialLoadRef.current = false;

        return () => engine.detachListeners();
    }, [currentSong]);
};