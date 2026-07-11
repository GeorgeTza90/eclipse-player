import { useEffect, useRef } from "react";
import { getJSON, setJSON } from "../../utils/localStorageManager";

export const useAudioPlayer = ({
    currentSong, volume, 
    audioEngineRef, isInitialLoadRef, nextRef,
    setDuration, setPositionRealtime, setIsPlaying,
}) => {
    const lastSavedPosRef = useRef(-1);

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

                const flooredPos = Math.floor(pos);
                if (flooredPos !== lastSavedPosRef) {
                    setJSON("positionRealtime", pos);                    
                    lastSavedPosRef.current = flooredPos;                    
                }                
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