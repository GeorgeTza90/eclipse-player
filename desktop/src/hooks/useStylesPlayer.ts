import { Extention } from "@/types/player.types";

export function useStylesPlayer(goRGB: boolean, coloredGlow: boolean, progress: number, shadowColor: string, volume: number, intensity: number, extention: Extention) {
    const sliderStyle = {
        background: goRGB && coloredGlow 
            ? `linear-gradient(to right, #acacac ${progress}%, #55555572 ${progress}%)`
            : `linear-gradient(to right, ${shadowColor} ${progress}%, #555 ${progress}%)`,
    };  
    const volumeSliderStyle = {
        background: goRGB && coloredGlow 
            ? `linear-gradient(to right, #acacac, #acacac ${volume * 100}%, #55555572 ${volume * 100}%)`
            : `linear-gradient(to right, ${shadowColor}, ${shadowColor} ${volume * 100}%, #555 ${volume * 100}%)`,  
    };
    const RGBStyle = { opacity: `${intensity / 24 + 0.1}` };    
    const extentionHoverStyle = { left: `${extention === "Playlist" ? 0 : extention === "Lyrics" ? 33.5 : 66}%` }   

    return { sliderStyle, volumeSliderStyle, RGBStyle, extentionHoverStyle }
}