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

    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${alpha})`;
    }

    return (<>
        {goRGB && coloredGlow && (
            <div style={circleRGB}/>
        )}
        <div style={circleColored}/>
    </>);
}

export default Circle;