import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import { useStylesCircle } from "@/hooks/useStylesCircle";
import type { CircleProps } from "@/types/ui.types";

const Circle = ({
    size = 200,
    top = 0,
    shadowColor = "#bebebe71",
    color1 = "#080808ff",
    color2 = "#1c1b1bff",
    colors,
    intensity = 30,
    heightOffset = 8,
    zIndex = 0
}: CircleProps) => {
    
    const { goRGB, coloredGlow } = useMiniPlayer();
    const gradientColors = colors ?? [color1, color2];    
    
    const { circleRGB, circleColored } = useStylesCircle({
        size, top, zIndex, intensity, heightOffset,
        shadowColor, goRGB, coloredGlow, gradientColors,
        left: 0,
    });

    return (<>
        {goRGB && coloredGlow && (
            <div style={circleRGB}/>
        )}
        <div style={circleColored}/>
    </>);
}

export default Circle;