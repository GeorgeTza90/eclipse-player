import { useState, useEffect } from "react";
import type { Song } from "@/types/songs.types";

export function useShadowColor(
    coloredGlow: boolean,
    currentSong: Song | null,
    defaultColor: string
): string {
    
    const [shadowColor, setShadowColor] = useState<string>(
        coloredGlow ? (currentSong?.averageColor ?? defaultColor) : "#bebebe"
    );

    useEffect(() => {
        setShadowColor(!coloredGlow ? defaultColor : (currentSong?.averageColor ?? "#bebebe"));
    }, [coloredGlow, currentSong]);

    return shadowColor;
}