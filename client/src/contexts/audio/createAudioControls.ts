import { EQ_BANDS } from "@/utils/defaultEQ";
import { setJSON } from "@/utils/localStorageManager";
import { LOUDNESS_PRESETS } from "@/utils/loudnessPresets";
import type { Song } from "@/types/songs.types";
import type { EQGains } from "@/types/player.types";
import type { CreateAudioControlsParams } from "@/types/audio.types";

export const createAudioControls = ({
    audioEngineRef, eqEngineRef, loudnessEngineRef, currentSong, normalization, loudnessPreset, playlist, currentSongIndex, EQGain,
    shuffle, repeatMode, shuffleOrder,
    setPlaylist, setPlaylistName, setCurrentSong, setCurrentSongIndex, setPositionRealtime, setIsPlaying, setEQGain,
}: CreateAudioControlsParams) => {

    const playSong = async (song: Song, newPlaylist?: Song[], name: string = "", startPosition: number = 0): Promise<void> => {        
        await eqEngineRef.current?.unlock();

        if (newPlaylist) {
            setPlaylist(newPlaylist);
            const index = newPlaylist.findIndex((item) => item.id === song.id);
            setCurrentSongIndex(index >= 0 ? index : 0);
            setPlaylistName(name);
        }

        setCurrentSong(song);
        setPositionRealtime(startPosition);
        setJSON("positionRealtime", startPosition);
    };

    const togglePlay = async (): Promise<void> => {
        const engine = audioEngineRef.current;
        if (!engine) return;

        const audioElement = engine.element;
        if (!audioElement) return;

        await eqEngineRef.current?.unlock();
        
        if (eqEngineRef.current && !eqEngineRef.current.initialized) {
            const ctx = eqEngineRef.current.ctx;

            if (ctx && loudnessEngineRef.current) {
                const loudnessGainNode = loudnessEngineRef.current.init(ctx);
                eqEngineRef.current.init(audioElement, EQGain, loudnessGainNode);
                if (normalization) loudnessEngineRef.current.applyForSong(currentSong, LOUDNESS_PRESETS[loudnessPreset]);
            }
        }

        if (engine.isPaused) {
            engine.play()?.catch(console.warn);
            setIsPlaying(true);
        } else {
            engine.pause();
            setIsPlaying(false);
        }
    };

    const stop = (): void => {
        audioEngineRef.current?.stop();
        setIsPlaying(false);
    };

    const getOrder = (): number[] =>
        shuffle && shuffleOrder.length === playlist.length
            ? shuffleOrder
            : playlist.map((_, i) => i);

    const next = (): void => {
        if (!playlist.length) return;
        const order = getOrder();

        setCurrentSongIndex((index) => {
            const currentPos = order.indexOf(index);
            const isLast = currentPos === order.length - 1;

            if (isLast && repeatMode === "off") {
                setIsPlaying(false);
                return index;
            }

            const nextPos = (currentPos + 1) % order.length;
            const nextIndex = order[nextPos];

            setCurrentSong(playlist[nextIndex]);
            setPositionRealtime(0);
            setJSON("positionRealtime", 0);

            return nextIndex;
        });
    };

    const previous = (): void => {
        if (!playlist.length) return;
        const order = getOrder();

        const currentPos = order.indexOf(currentSongIndex);
        const previousPos = (currentPos - 1 + order.length) % order.length;
        const previousIndex = order[previousPos];

        setCurrentSongIndex(previousIndex);
        setCurrentSong(playlist[previousIndex]);
        setPositionRealtime(0);
        setJSON("positionRealtime", 0);
    };

    const seekTo = (pos: number): void => {
        audioEngineRef.current?.seek(pos);
        setPositionRealtime(pos);
    };

    const updateEQGain = (label: string, value: number): void => {
        eqEngineRef.current?.updateGain(label, value);
        setEQGain((previous) => ({ ...previous, [label]: value }));
    };

    const resetEQ = (): void => {
        const resetValues: EQGains = {};
        EQ_BANDS.forEach((band) => resetValues[band.label] = 0);
        eqEngineRef.current?.reset();
        setEQGain(resetValues);
    };

    return {
        playSong, togglePlay, stop, next, previous, seekTo, updateEQGain, resetEQ,
    };
};