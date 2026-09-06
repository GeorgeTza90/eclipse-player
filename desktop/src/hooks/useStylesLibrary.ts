import { getGridConfig } from "@/utils/sizeSwitch";
import { useWidth } from "./useScreen";
import { CSSProperties } from "react";
import hexToRgba from "@/utils/hexToRgba";

export function useStylesLibrary({
    hover,
    averageColor,
}: {
    hover?: boolean;
    averageColor?: string;
}) {
    const width = useWidth();
    const { columns } = getGridConfig(width ? width : 3);

    const containerStyle = { marginLeft: `${width/100}rem` }
    const horizontalScrollStyle = { gridTemplateColumns: `repeat(${columns}, 7rem)`, gap:"2.4rem" };

    const trackYearStyle = { display: hover ? "hidden" : "block", color: hover ?  "#a0a0a000" : "#a0a0a0e0", fontSize: "0.72rem", margin: "2px 0" };
    const artistNameStyle = { fontSize: hover ? "0.75rem" : "0.85rem", color: hover ?  "#a0a0a000" : "#a0a0a0e0" }
    const AlbumImageStyle = { width: (hover ? "9rem" : "7rem"), margin: hover ? "-0.15rem" : "0rem", borderRadius: hover ? "0rem" : "0.4rem" }
    const ArtistImageStyle = { width: (hover ? "9rem" : "7rem"), margin: hover ? "-0.15rem" : "0rem", borderRadius: hover ? "1rem" : "50%" }
    const TextStyle = { fontSize: hover ? "0.72rem" : "0.8rem", marginTop: hover ? "0.2rem" : "0.1rem" }
    const playButtonStyle: CSSProperties = { position: "absolute", zIndex: 50, marginTop: "6rem", marginLeft: "6rem", opacity: hover ? "100%" : "0%", transition: "0.5s", boxShadow: "1px 1px 1px #00000061" }

    const headerStyle = { background: `linear-gradient(to bottom, ${hexToRgba(averageColor, 0.1)}, #55555500 )` }
    const containerStyle2 = { background: `linear-gradient(to bottom, ${hexToRgba(averageColor, 0.2)}, #131316f3 )` }  

    return { containerStyle, horizontalScrollStyle, trackYearStyle, artistNameStyle, AlbumImageStyle, ArtistImageStyle, TextStyle, playButtonStyle, headerStyle, containerStyle2 };
}