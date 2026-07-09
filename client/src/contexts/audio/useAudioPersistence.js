import { useEffect } from "react";
import { setJSON } from "../../utils/localStorageManager";

export const useAudioPersistence = ({
    playlist, playlistName, currentSongIndex, currentSong,
    EQGain, volume, audioEngineRef,
}) => {

    useEffect(() => setJSON("audio_playlist", playlist), [playlist]);
    useEffect(() => setJSON("audio_playlistName", playlistName), [playlistName]);
    useEffect(() => setJSON("audio_currentSongIndex", currentSongIndex), [currentSongIndex]);
    useEffect(() => setJSON("EQGain", EQGain), [EQGain]);

    useEffect(() => {
        if (currentSong) setJSON("audio_currentSong", currentSong);
    }, [currentSong]);

    useEffect(() => {
        setJSON("audio_volume", volume);
        audioEngineRef.current.setVolume(volume);
    }, [volume]);
};