import { createContext, useState, useEffect, useContext } from "react";
import { getBool, getJSON, setBool, setJSON } from "../utils/localStorageManager";
import { useMiniPlayerPersistence } from "./miniPlayer/useMiniPlayerPersistence";
import { useMiniPlayerDrag } from "./miniPlayer/useMiniPlayerDrag";

const MiniPlayerContext = createContext(undefined);

export const MiniPlayerProvider = ({ children }) => {    
    const [showImage, setShowImage] = useState(() => getBool("miniPlayer_showImage", true));
    const [showMiniPlayer, setShowMiniPlayer] = useState(() => getBool("miniPlayer_showMiniPlayer", true));
    const [showTimeBar, setShowTimeBar] = useState(() => getBool("miniPlayer_showTimeBar", true));
    const [showVolumeBar, setShowVolumeBar] = useState(() => getBool("miniPlayer_showVolumeBar", true));
    const [showGlow, setShowGlow] = useState(() => getBool("miniPlayer_showGlow", true));
    const [transparency, setTransparency] = useState(() => getBool("miniPlayer_transparency", true));
    const [barMode, setBarMode] = useState(() => getBool("miniPlayer_barMode", false));
    const [playerPage, setPlayerPage] = useState(() => getBool("miniPlayer_playerPage", false));
    const [coloredGlow, setColoredGlow] = useState(() => getBool("player_coloredGlow", false));
    const [goRGB, setGoRGB] = useState(() => getBool("player_goRGB", true));
    
    const [pos, setPos] = useState(() => getJSON("miniPlayer_position", { x: 500, y: 850 }));
    const [dragging, setDragging] = useState(false);
    const [rel, setRel] = useState({ x: 0, y: 0 });

    useMiniPlayerPersistence({
        showImage, showMiniPlayer, showTimeBar, showVolumeBar, showGlow,
        transparency, barMode, playerPage, coloredGlow, goRGB,
    });

    const { onMouseDown } = useMiniPlayerDrag({
        pos, setPos, dragging, setDragging, rel, setRel
    });

    return (
        <MiniPlayerContext.Provider
            value={{
                pos, dragging, rel, showImage, showMiniPlayer, showTimeBar, showVolumeBar,
                showGlow, transparency, barMode, playerPage, coloredGlow, goRGB,
                setPos, setDragging, setRel, onMouseDown, setShowImage, setShowMiniPlayer,
                setShowTimeBar, setShowVolumeBar, setShowGlow, setTransparency, setBarMode,
                setPlayerPage, setColoredGlow, setGoRGB,
            }}
        >
            {children}
        </MiniPlayerContext.Provider>
    );
};

export const useMiniPlayer = () => {
    const context = useContext(MiniPlayerContext);
    if (!context) throw new Error("useMiniPlayer must be used within MiniPlayerProvider");
    return context;
};