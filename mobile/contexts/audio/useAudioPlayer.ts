import { useEffect } from "react";
import { UseAudioPlayerProps } from "@/types/audio";
import { recordPlay } from "@/services/PostService";

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
            onPlayThresholdReached: (time, duration) => {
                if (currentSong.isPrivate) return;
                recordPlay(Number(currentSong.id), Math.floor(time), Math.floor(duration))
                    .catch(console.warn);
            },
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