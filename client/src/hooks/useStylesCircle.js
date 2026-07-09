import { useIsMobile } from "./useIsMobile";

export function useStylesCircle(
    size,
    top,
    zIndex,
    intensity,
    heightOffset,
    shadowColor,
    goRGB,
    coloredGlow,
    gradientColors,
    left
) {
    const isMobile = useIsMobile();

    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        return `rgba(${r},${g},${b},${alpha})`;
    }

    const circleRGB = {
        position: "fixed",
        width: size + 10,
        height: size + 10,
        borderRadius: "50%",
        top,
        zIndex,
        opacity: intensity / 60 + 0.05,
        background: "conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)",
        animation: "spin 2.5s linear infinite",
        WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 10px), black 0)",
        mask:
            "radial-gradient(farthest-side, transparent calc(100% - 10px), black 0)",
    };


    const circleColored = {
        position: "fixed",
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        top,
        boxShadow:
            goRGB && coloredGlow
                ? ""
                : `0px ${heightOffset}px ${intensity}px ${
                    hexToRgba(
                        shadowColor,
                        Math.min(intensity / 30, 1)
                    )
                }`,
        background:
            `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
        zIndex,
        transition: "0.5s",
    };


    const miniCircleRGB = {
        left: left - 2,
        top,
        position: "absolute",
        width: size + 5,
        height: size + 5,
        borderRadius: "50%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: intensity / 24 + 0.05,
        background:
            "conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)",
        animation: "spin 2.5s linear infinite",
        WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 10px), black 0)",
        zIndex: -10,
    };


    const miniCircleColored = {
        left,
        top,
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow:
            goRGB && coloredGlow
                ? ""
                : `0px ${heightOffset}px ${intensity}px ${
                    hexToRgba(
                        shadowColor,
                        Math.min(intensity / 30, 1)
                    )
                }`,
        background:
            `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
        zIndex: -10,
        transition: "0.5s",
    };


    return {
        circleRGB,
        circleColored,
        miniCircleRGB,
        miniCircleColored
    };
};