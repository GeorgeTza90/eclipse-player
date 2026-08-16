import { useMiniPlayer } from "../../../contexts/MiniPlayerContextWeb";
import { useStylesCircle } from "../../../hooks/useStylesCircle";

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
}) => {
    
    const { goRGB, coloredGlow } = useMiniPlayer();
    const gradientColors = colors ?? [color1, color2];
    
    const { circleRGB, circleColored } = useStylesCircle(
        size, top, zIndex, intensity, heightOffset, shadowColor,
        goRGB, coloredGlow, gradientColors
    );

    return (<>
        {goRGB && coloredGlow && (
            <div style={circleRGB}/>
        )}
        <div style={circleColored}/>
    </>);
}

export default Circle;