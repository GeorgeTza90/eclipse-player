import { useEffect, useState } from "react";
import { getBool, getJSON } from "@/utils/localStorageManager";
import { buildShuffleOrder } from "./shuffleOrder";
import type { Song } from "@/types/songs.types";
import type { RepeatMode } from "@/types/player.types";

export function usePlaybackMode(playlist: Song[], currentSongIndex: number) {
    const [shuffle, setShuffleState] = useState<boolean>(() => getBool("audio_shuffle", false));
    const [repeatMode, setRepeatModeState] = useState<RepeatMode>(() => getJSON<RepeatMode>("audio_repeatMode", "off"));
    const [shuffleOrder, setShuffleOrder] = useState<number[]>([]);

    useEffect(() => {
        if (!shuffle) return;
        setShuffleOrder(buildShuffleOrder(playlist.length, currentSongIndex));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shuffle, playlist]);

    const toggleShuffle = (): void => setShuffleState((prev) => !prev);
    const cycleRepeatMode = (): void => {
        setRepeatModeState((prev) => (prev === "off" ? "all" : prev === "all" ? "one" : "off"));
    };

    return { shuffle, repeatMode, shuffleOrder, toggleShuffle, cycleRepeatMode };
}