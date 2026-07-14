import { useEffect } from "react";
import { UseAudioPlayerProps } from "@/types/audio";

export function useAudioPlayer({
    player, currentSong, volume, loudnessGain, shouldAutoplay,
    audioEngineRef, nextRef,
    setDuration, setPosition, setIsPlaying, setShouldAutoplay,
}: UseAudioPlayerProps) {
    useEffect(() => {
        if (!currentSong) return;

        const engine = audioEngineRef.current;
        player.volume = volume * loudnessGain;

        engine.attach(player, {
            onTimeUpdate: (time, duration) => {
                setPosition(time);
                setDuration(duration);
            },
            onPlayingChange: (playing) => setIsPlaying(playing),
            onEnded: () => nextRef.current?.(),
        });

        if (shouldAutoplay) {
            engine.play();
            setIsPlaying(true);
            setShouldAutoplay(false);
        }

        return () => engine.release();
    }, [currentSong]);
}