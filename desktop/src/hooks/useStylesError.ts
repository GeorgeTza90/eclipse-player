import type { CSSProperties } from "react";
import { ErrorStyleProps } from "@/types/ui.types";

export function useStylesError({
    height,
    visible
} : ErrorStyleProps = {}) {
    const errorText: CSSProperties = {
        color: "rgb(255, 52, 52)",
        padding: "0.4rem 0.6rem",
        margin: "0rem",
        borderRadius: "0.5rem",
        backgroundColor: "#04001197",
        fontSize: "14px",
    }

    const styleDiv: CSSProperties = {
        height: height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

    const styleP: CSSProperties = {
        opacity: visible ? 1 : 0,
        marginTop: 5
    }
    
    return { errorText, styleDiv, styleP };
};