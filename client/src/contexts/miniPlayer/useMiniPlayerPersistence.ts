import { useEffect } from "react";
import { setBool } from "@/utils/localStorageManager";
import type { MiniPlayerPersistenceValues } from "@/types/player.types";

const PERSISTED_KEYS: Record<keyof MiniPlayerPersistenceValues, string> = {
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

export const useMiniPlayerPersistence = (values: MiniPlayerPersistenceValues): void => {
    const {
        showImage, showMiniPlayer, showTimeBar, showVolumeBar, showGlow,
        transparency, barMode, playerPage, coloredGlow, goRGB,
    } = values;

    useEffect(() => {
        const currentValues: MiniPlayerPersistenceValues = {
            showImage, showMiniPlayer, showTimeBar, showVolumeBar, showGlow,
            transparency, barMode, playerPage, coloredGlow, goRGB,
        };

        for (const [key, storageKey] of Object.entries(PERSISTED_KEYS) as [keyof MiniPlayerPersistenceValues, string][]) {
            setBool(storageKey, currentValues[key]);
        }
    }, [ showImage, showMiniPlayer, showTimeBar, showVolumeBar, showGlow, transparency, barMode, playerPage, coloredGlow, goRGB ]);
};