import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import { useStylesCircle } from "@/hooks/useStylesCircle";
import type { CircleProps } from "@/types/circle.types";

const Circle = ({
    size = 200,
    left = -100,
    top = -40,
    shadowColor = "#bebebe71",
    color1 = "#080808ff",
    color2 = "#1c1b1bff",
    colors,
    intensity = 30,
    heightOffset = 8,
}: CircleProps) => {

    const { goRGB, coloredGlow } = useMiniPlayer();
    const gradientColors = colors ?? [color1, color2];

    const { miniCircleRGB, miniCircleColored } = useStylesCircle({
        size, top, left, zIndex: -10, intensity, heightOffset,
        shadowColor, goRGB, coloredGlow, gradientColors,
    });

    return (<>
            {goRGB && coloredGlow && (
                <div style={miniCircleRGB}/>
            )}
            <div style={miniCircleColored}/>
    </>);
};


export default Circle;