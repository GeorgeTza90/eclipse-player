import { Song } from "@/types/songs";
import { CreateAudioControlsProps } from "@/types/audio";

export const createAudioControls = ({
    audioEngineRef, library, currentSongIndex, loudnessGain, router,
    setLibrary, setPlaylistName, setCurrentSong, setCurrentSongIndex,
    setPosition, setShouldAutoplay, setIsPlaying, setVolumeState,
}: CreateAudioControlsProps) => {

    const playSong = (song: Song, playlist?: Song[], name = "") => {
        if (playlist) {
            setLibrary(playlist);
            const index = playlist.findIndex((s) => s.id === song.id);
            setCurrentSongIndex(index >= 0 ? index : 0);
            if (name) setPlaylistName(name);
        }
        setCurrentSong({ ...song });
        setPosition(0);
        setShouldAutoplay(true);
        router.push("/player");
    };

    const togglePlay = () => {
        const engine = audioEngineRef.current;
        if (engine.isPlaying) {
            engine.pause();
            setIsPlaying(false);
        } else {
            engine.play();
            setIsPlaying(true);
        }
    };

    const stop = () => {
        audioEngineRef.current.stop();
        setPosition(0);
        setIsPlaying(false);
    };

    const next = () => {
        if (!library.length) return;
        const nextIndex = (currentSongIndex + 1) % library.length;
        setCurrentSongIndex(nextIndex);
        setCurrentSong(library[nextIndex]);
        setPosition(0);
        setShouldAutoplay(true);
    };

    const previous = () => {
        if (!library.length) return;
        const prevIndex = (currentSongIndex - 1 + library.length) % library.length;
        setCurrentSongIndex(prevIndex);
        setCurrentSong(library[prevIndex]);
        setPosition(0);
        setShouldAutoplay(true);
    };

    const setVolume = (vol: number) => {
        setVolumeState(vol);
        audioEngineRef.current.setVolume(vol * loudnessGain);
    };

    const seekTo = (pos: number) => {
        audioEngineRef.current.seek(pos);
        setPosition(pos);
    };

    return { playSong, togglePlay, stop, next, previous, setVolume, seekTo };
};