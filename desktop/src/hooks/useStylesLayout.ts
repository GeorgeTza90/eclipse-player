import hexToRgba from "@/utils/hexToRgba"
import { useShadowColor } from "./useShadowColor"
import { useAudio } from "@/contexts/AudioContextWeb"
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";

export function useStylesLayout() {
    const { currentSong, volume } = useAudio();
    const { coloredGlow, showGlow, goRGB } = useMiniPlayer();
    const shadowColor = useShadowColor(coloredGlow || false, currentSong, "#bebebe00")

    const MBstyle = {
        background: goRGB
            ? ``
            : `linear-gradient(to top left, ${showGlow ? (!coloredGlow ? "#171717" : hexToRgba(shadowColor, 0.2)) : "#141414"}, ${showGlow ? (!coloredGlow ? "#141414" : "#171717") : "#141414" } ${volume*90}%)`,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndez: 9,  
    }

    return  { MBstyle };
}