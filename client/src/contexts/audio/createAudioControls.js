import { EQ_BANDS } from "../../utils/defaultEQ";
import { setJSON } from "../../utils/localStorageManager";
import { LOUDNESS_PRESETS } from "../../utils/loudnessPresets";

export const createAudioControls = ({
    audioEngineRef, eqEngineRef, loudnessEngineRef, 
    currentSong, normalization, loudnessPreset,
    playlist, currentSongIndex, EQGain,
    setPlaylist, setPlaylistName, setCurrentSong, setCurrentSongIndex,
    setPositionRealtime, setIsPlaying, setEQGain,
}) => {
    
    const playSong = async (song, newPlaylist, name = "", startPosition = 0) => {
        await eqEngineRef.current.unlock();

        if (newPlaylist) {
            setPlaylist(newPlaylist);
            const index = newPlaylist.findIndex(s => s.id === song.id);
            setCurrentSongIndex(index >= 0 ? index : 0);
            setPlaylistName(name);
        }

        setCurrentSong(song);
        setPositionRealtime(startPosition);
        setJSON("positionRealtime", startPosition);
    };

    const togglePlay = async () => {
        const engine = audioEngineRef.current;
        if (!engine.audio) return;

        await eqEngineRef.current.unlock();

        if (!eqEngineRef.current.initialized) {
            const loudnessGainNode = loudnessEngineRef.current.init(eqEngineRef.current.ctx);
            eqEngineRef.current.init(engine.audio, EQGain, loudnessGainNode);
            eqEngineRef.current.initialized = true;

            if (normalization) {
                loudnessEngineRef.current.applyForSong(currentSong, LOUDNESS_PRESETS[loudnessPreset]);
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

    const stop = () => {
        audioEngineRef.current.stop();
        setIsPlaying(false);
    };

    const next = () => {
        if (!playlist.length) return;
        setCurrentSongIndex(i => {
            const nextI = (i + 1) % playlist.length;
            setCurrentSong(playlist[nextI]);
            setPositionRealtime(0);
            setJSON("positionRealtime", 0);
            return nextI;
        });
    };

    const previous = () => {
        if (!playlist.length) return;
        const prevI = (currentSongIndex - 1 + playlist.length) % playlist.length;
        setCurrentSongIndex(prevI);
        setCurrentSong(playlist[prevI]);
        setPositionRealtime(0);
        setJSON("positionRealtime", 0);
    };

    const seekTo = (pos) => {
        audioEngineRef.current.seek(pos);
        setPositionRealtime(pos);
    };

    const updateEQGain = (label, value) => {
        eqEngineRef.current.updateGain(label, value);
        setEQGain(prev => ({ ...prev, [label]: value }));
    };

    const resetEQ = () => {
        const resetValues = {};
        EQ_BANDS.forEach(band => resetValues[band.label] = 0);
        eqEngineRef.current.reset();
        setEQGain(resetValues);
    };

    return {
        playSong, togglePlay, stop, next, previous, seekTo, updateEQGain, resetEQ,
    };
};