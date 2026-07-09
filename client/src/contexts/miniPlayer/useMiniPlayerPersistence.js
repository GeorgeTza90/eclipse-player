import { useEffect } from "react";
import { setBool } from "../../utils/localStorageManager";

export const useMiniPlayerPersistence = ({
    showImage, showMiniPlayer, showTimeBar, showVolumeBar, showGlow,
    transparency, barMode, playerPage, coloredGlow, goRGB,
}) => {
    useEffect(() => setBool("miniPlayer_showImage", showImage), [showImage]);
    useEffect(() => setBool("miniPlayer_showMiniPlayer", showMiniPlayer), [showMiniPlayer]);
    useEffect(() => setBool("miniPlayer_showTimeBar", showTimeBar), [showTimeBar]);
    useEffect(() => setBool("miniPlayer_showVolumeBar", showVolumeBar), [showVolumeBar]);
    useEffect(() => setBool("miniPlayer_showGlow", showGlow), [showGlow]);
    useEffect(() => setBool("miniPlayer_transparency", transparency), [transparency]);
    useEffect(() => setBool("miniPlayer_barMode", barMode), [barMode]);
    useEffect(() => setBool("miniPlayer_playerPage", playerPage), [playerPage]);
    useEffect(() => setBool("player_coloredGlow", coloredGlow), [coloredGlow]);
    useEffect(() => setBool("player_goRGB", goRGB), [goRGB]);
};