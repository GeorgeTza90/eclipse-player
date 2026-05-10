import { useMiniPlayer } from "../../contexts/MiniPlayerContextWeb";
import { useAudio } from "../../contexts/AudioContextWeb";

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
}) => {
  const { goRGB, coloredGlow } = useMiniPlayer();
  const { volume } = useAudio();
  const gradientColors = colors ?? [color1, color2];

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }  

  return (<>
      {goRGB && coloredGlow && (
          <div
            style={{
                left: left -2,
                top: top,
                position: "absolute",
                width: size + 5,
                height: size + 5,
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: `${intensity / 24}`,
                background: "conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)",
                animation: "spin 2.5s linear infinite",
                WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 10px), black 0)",
                zIndex: -10,                
            }}
          />
      )}
        <div
            style={{
                left: left,
                top: top,
                position: "absolute",
                width: size,
                height: size,
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: goRGB && coloredGlow
                    ? ""
                    : `0px ${heightOffset}px ${intensity}px ${hexToRgba(shadowColor, Math.min(intensity / 30, 1))}`,
                background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
                zIndex: -10,
                transition: "0.5s",
            }}
          />
    </>);
}

export default Circle;