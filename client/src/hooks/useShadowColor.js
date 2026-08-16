import { useState, useEffect } from "react";

export function useShadowColor(coloredGlow, currentSong, defaultColor) {
    const [shadowColor, setShadowColor] = useState(
        coloredGlow ? (currentSong?.averageColor ?? defaultColor) : "#bebebe"
    );

    useEffect(() => {
        setShadowColor(!coloredGlow ? defaultColor : (currentSong?.averageColor ?? "#bebebe"));
    }, [coloredGlow, currentSong]);

    return shadowColor;
}