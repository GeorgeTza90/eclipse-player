import { useEffect } from "react";
import { setJSON, setBool } from "../../utils/localStorageManager";

export const useAudioPersistence = ({
    playlist, playlistName, currentSongIndex, currentSong,
    EQGain, volume, audioEngineRef, loudnessPreset, normalization,
}) => {

    useEffect(() => setJSON("audio_playlist", playlist), [playlist]);
    useEffect(() => setJSON("audio_playlistName", playlistName), [playlistName]);
    useEffect(() => setJSON("audio_currentSongIndex", currentSongIndex), [currentSongIndex]);
    useEffect(() => setJSON("EQGain", EQGain), [EQGain]);
    useEffect(() => setJSON("audio_loudnessPreset", loudnessPreset), [loudnessPreset]);    
    useEffect(() => setBool("audio_normalization", normalization), [normalization]);
    useEffect(() => {
        if (currentSong) setJSON("audio_currentSong", currentSong);
    }, [currentSong]);

    useEffect(() => {
        setJSON("audio_volume", volume);
        audioEngineRef.current.setVolume(volume);
    }, [volume]);
};