import { useEffect } from "react";
import { getJSON, setJSON } from "../../utils/localStorageManager";

export const useAudioPlayer = ({
    currentSong, volume, EQGain,
    audioEngineRef, eqEngineRef, isInitialLoadRef, nextRef,
    setDuration, setPositionRealtime, setIsPlaying,
}) => {
    
    useEffect(() => {
        if (!currentSong) return;

        const engine = audioEngineRef.current;

        const savedPosition = isInitialLoadRef.current
            ? parseFloat(getJSON("positionRealtime", 0)) || 0
            : 0;

        engine.load(currentSong.url, {
            volume,
            startPosition: savedPosition
        });

        engine.attachListeners({
            onLoaded: () => {
                setDuration(engine.duration);
                eqEngineRef.current.init(engine.audio, EQGain);
            },
            onTimeUpdate: () => {
                const pos = engine.currentTime;
                setPositionRealtime(pos);
                setJSON("positionRealtime", pos);
            },
            onEnded: () => nextRef.current(),
            onPlay: () => setIsPlaying(true),
            onPause: () => setIsPlaying(false),
        });


        if (!isInitialLoadRef.current) {
            engine.play()?.catch(console.warn);
            setIsPlaying(true);
        }

        isInitialLoadRef.current = false;

        return () => engine.detachListeners();        
    }, [currentSong]);

};