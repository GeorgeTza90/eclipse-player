import { useEffect } from "react";
import { setBool, getBool } from "../../utils/localStorageManager";

const PERSISTED_KEYS = {
    showImage: "miniPlayer_showImage",
    showMiniPlayer: "miniPlayer_showMiniPlayer",
    showTimeBar: "miniPlayer_showTimeBar",
    showVolumeBar: "miniPlayer_showVolumeBar",
    showGlow: "miniPlayer_showGlow",
    transparency: "miniPlayer_transparency",
    barMode: "miniPlayer_barMode",
    playerPage: "miniPlayer_playerPage",
    coloredGlow: "player_coloredGlow",
    goRGB: "player_goRGB",
};

export const useMiniPlayerPersistence = (values) => {
    useEffect(() => {
        for (const [key, storageKey] of Object.entries(PERSISTED_KEYS)) {
            const newValue = values[key];
            const currentValue = getBool(storageKey, newValue);
            if (currentValue !== newValue) setBool(storageKey, values[key]);
        }
    }, Object.values(values));
};