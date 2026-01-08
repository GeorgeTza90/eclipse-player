import { createContext, useState, useEffect, useContext } from "react";
import { getBool, getJSON, setBool, setJSON } from "../utils/localStorageManager";

const MiniPlayerContext = createContext(undefined);

export const MiniPlayerProvider = ({ children }) => {
    /* ---------------- VISIBILITY SETTINGS ---------------- */
    const [showImage, setShowImage] = useState(() => getBool("miniPlayer_showImage", true));
    const [showMiniPlayer, setShowMiniPlayer] = useState(() => getBool("miniPlayer_showMiniPlayer", true));
    const [showTimeBar, setShowTimeBar] = useState(() => getBool("miniPlayer_showTimeBar", true));
    const [showVolumeBar, setShowVolumeBar] = useState(() => getBool("miniPlayer_showVolumeBar", true));
    const [showGlow, setShowGlow] = useState(() => getBool("miniPlayer_showGlow", true));
    const [transparency, setTransparency] = useState(() => getBool("miniPlayer_transparency", true));

    /* ---------------- POSITION (DRAG) ---------------- */
    const [pos, setPos] = useState(() => getJSON("miniPlayer_position", { x: 500, y: 850 }));
    const [dragging, setDragging] = useState(false);
    const [rel, setRel] = useState({ x: 0, y: 0 });

    const onMouseDown = (e) => {
        setDragging(true);
        setRel({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    };

    const onMouseMove = (e) => {
        if (!dragging) return;
        setPos({ x: e.clientX - rel.x, y: e.clientY - rel.y });
    };

    const onMouseUp = () => setDragging(false);

    /* ---------------- LOCAL STORAGE ---------------- */
    useEffect(() => setBool("miniPlayer_showImage", showImage), [showImage]);
    useEffect(() => setBool("miniPlayer_showMiniPlayer", showMiniPlayer), [showMiniPlayer]);
    useEffect(() => setBool("miniPlayer_showTimeBar", showTimeBar), [showTimeBar]);
    useEffect(() => setBool("miniPlayer_showVolumeBar", showVolumeBar), [showVolumeBar]);
    useEffect(() => setBool("miniPlayer_showGlow", showGlow), [showGlow]);
    useEffect(() => setBool("miniPlayer_transparency", transparency), [transparency]);
    useEffect(() => setJSON("miniPlayer_position", pos), [pos]);

    return (
        <MiniPlayerContext.Provider
            value={{
                pos, setPos, dragging, setDragging, rel, setRel, onMouseDown, onMouseMove, onMouseUp,
                showImage, setShowImage, showMiniPlayer, setShowMiniPlayer, showTimeBar, setShowTimeBar,
                showVolumeBar, setShowVolumeBar, showGlow, setShowGlow, transparency, setTransparency,
            }}
        >
            {children}
        </MiniPlayerContext.Provider>
    );
};

export const useMiniPlayer = () => {
    const context = useContext(MiniPlayerContext);
    if (!context) {
        throw new Error("useMiniPlayer must be used within MiniPlayerProvider");
    }
    return context;
};
