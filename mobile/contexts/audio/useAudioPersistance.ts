import { UseAudioPersistanceProps } from "@/types/audio";
import { setJSON, setBool } from "@/utils/localStorageManager";
import { useEffect, useRef } from "react";

export const useAudioPersistance = ({
    library, playlistName, currentSongIndex, currentSong, volume, position,
    normalization, loudnessPreset,
}: UseAudioPersistanceProps) => {
    const lastSavedPositionRef = useRef(-1);

    useEffect(() => { setJSON("audio_library", library); }, [library]);
    useEffect(() => { setJSON("audio_playlistName", playlistName); }, [playlistName]);
    useEffect(() => { setJSON("audio_currentSongIndex", currentSongIndex); }, [currentSongIndex]);
    useEffect(() => { if (currentSong) setJSON("audio_currentSong", currentSong); }, [currentSong]);
    useEffect(() => { setJSON("audio_volume", volume); }, [volume]);
    useEffect(() => { setBool("audio_normalization", normalization); }, [normalization]);
    useEffect(() => { setJSON("audio_loudnessPreset", loudnessPreset); }, [loudnessPreset]);
    
    useEffect(() => {
        const flooredPos = Math.floor(position);
        if (flooredPos !== lastSavedPositionRef.current) {
            setJSON("positionRealtime", position);
            lastSavedPositionRef.current = flooredPos;
        }
    }, [position]);
};