import { MiniPlayerPosition } from "@/types/player.types";

export function useStylesSliders(
    goRGB: boolean,
    coloredGlow: boolean,
    progress: number,
    shadowColor: string,
    intensity: number,
    volume: number,
    pos: MiniPlayerPosition,
    transparency: boolean,
) {
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
    const rgbStyleslider = { opacity: `${intensity / 24 + 0.1}` };
    
    const rgbStyleBG = { opacity: `${intensity / 800 + 0.02}` };

    const miniPlayerDiv = { left: pos.x, top: pos.y, opacity: transparency ? 0.7 : 1 };

    const RGBStyle = { opacity: `${intensity / 24 + 0.1}` };

    return { sliderStyle, volumeSliderStyle, rgbStyleslider, rgbStyleBG, miniPlayerDiv, RGBStyle };
}