import { createContext, useState, useEffect, useContext } from "react";
import { getBool, getJSON, setBool, setJSON } from "../utils/localStorageManager";

const MiniPlayerContext = createContext(undefined);

export const MiniPlayerProvider = ({ children }) => {    
    /* --- VISIBILITY SETTINGS --- */
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

    /* --- POSITION (DRAG) --- */
    const [pos, setPos] = useState(() => getJSON("miniPlayer_position", { x: 500, y: 850 }));
    const [dragging, setDragging] = useState(false);
    const [rel, setRel] = useState({ x: 0, y: 0 });

    const onMouseDown = (e) => {
        const tag = e.target.tagName;
        if (tag === "INPUT" || tag === "BUTTON") return;
        setDragging(true);
        setRel({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    };

    /* --- DOCUMENT-LEVEL DRAG HANDLERS --- */
    useEffect(() => {
        if (!dragging) return;

        const handleMouseMove = (e) => {
            setPos({ x: e.clientX - rel.x, y: e.clientY - rel.y });
        };

        const handleMouseUp = () => {
            setDragging(false);
            setJSON("miniPlayer_position", pos);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging, rel, pos]);

    /* --- LOCAL STORAGE --- */
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