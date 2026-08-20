import { createContext, useContext, useState } from "react";
import { getBool, getJSON } from "@/utils/localStorageManager";
import { useMiniPlayerPersistence } from "./miniPlayer/useMiniPlayerPersistence";
import { useMiniPlayerDrag } from "./miniPlayer/useMiniPlayerDrag";
import type { MiniPlayerContextValue, MiniPlayerPosition, MiniPlayerProviderProps, MiniPlayerRelativePosition } from "@/types/player.types";

const MiniPlayerContext = createContext<MiniPlayerContextValue | undefined>(undefined);

export const MiniPlayerProvider = ({ children }: MiniPlayerProviderProps) => {
    const [showImage, setShowImage] = useState<boolean>(() => getBool("miniPlayer_showImage", true));
    const [showMiniPlayer, setShowMiniPlayer] = useState<boolean>(() => getBool("miniPlayer_showMiniPlayer", true));
    const [showTimeBar, setShowTimeBar] = useState<boolean>(() => getBool("miniPlayer_showTimeBar", true));
    const [showVolumeBar, setShowVolumeBar] = useState<boolean>(() => getBool("miniPlayer_showVolumeBar", true));
    const [showGlow, setShowGlow] = useState<boolean>(() => getBool("miniPlayer_showGlow", true));
    const [transparency, setTransparency] = useState<boolean>(() => getBool("miniPlayer_transparency", true));
    const [barMode, setBarMode] = useState<boolean>(() => getBool("miniPlayer_barMode", false));
    const [playerPage, setPlayerPage] = useState<boolean>(() => getBool("miniPlayer_playerPage", false));
    const [coloredGlow, setColoredGlow] = useState<boolean>(() => getBool("player_coloredGlow", false));
    const [goRGB, setGoRGB] = useState<boolean>(() => getBool("player_goRGB", true));

    const [pos, setPos] = useState<MiniPlayerPosition>(() => getJSON<MiniPlayerPosition>("miniPlayer_position", { x: 500, y: 850 }));
    const [dragging, setDragging] = useState<boolean>(false);
    const [rel, setRel] = useState<MiniPlayerRelativePosition>({ x: 0, y: 0 });

    useMiniPlayerPersistence({
        showImage, showMiniPlayer, showTimeBar, showVolumeBar, showGlow, transparency, barMode, playerPage, coloredGlow, goRGB,
    });

    const { onMouseDown } = useMiniPlayerDrag({ pos, setPos, dragging, setDragging, rel, setRel });

    const value: MiniPlayerContextValue = {
        pos, dragging, rel, showImage, showMiniPlayer, showTimeBar, showVolumeBar, showGlow,
        transparency, barMode, playerPage, coloredGlow, goRGB,
        setPos, setDragging, setRel, onMouseDown, setShowImage, setShowMiniPlayer, setShowTimeBar,
        setShowVolumeBar, setShowGlow, setTransparency, setBarMode, setPlayerPage, setColoredGlow, setGoRGB,
    };

    return (
        <MiniPlayerContext.Provider value={value}>
            {children}
        </MiniPlayerContext.Provider>
    );
};

export const useMiniPlayer = (): MiniPlayerContextValue => {
    const context = useContext(MiniPlayerContext);
    if (!context) throw new Error("useMiniPlayer must be used within MiniPlayerProvider");
    return context;
};