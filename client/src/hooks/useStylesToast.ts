import { useIsMobile } from "./useIsMobile";
import type { ToastType } from "@/types/ui.types";
import type { CSSProperties } from "react";

export function useStylesToast(type: ToastType = "info") {
    const isMobile = useIsMobile();

    const wrapper: CSSProperties = {
        position: "fixed",
        bottom: 100,
        right: 20,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        fontSize: isMobile ? "0.8rem" : "0.9rem",
    };

    const toastItemStyle = (type: ToastType): CSSProperties => ({
        padding: isMobile ? "8px 10px" : "8px 14px",
        borderRadius: 6,
        color: "#fff",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        backgroundColor:
            type === "success" ? "#239050" :
            type === "error" ? "#ac392c" :
            "#536a76",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        opacity: 0.95,
        animation: "slideIn 0.3s ease-out",
    });

    const toastStyle = (type: ToastType): CSSProperties => ({
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "12px 20px",
        borderRadius: "6px",
        color: "white",
        fontWeight: "bold",
        zIndex: 99999,
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        opacity: 0.95,
        animation: "slideIn 0.3s ease-out",
        backgroundColor:
            type === "success" ? "#2ecc71" :
            type === "error" ? "#e74c3c" :
            "#3498db",
    });

    const closeButtonStyle: CSSProperties = {
        background: "none",
        border: "none",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: 1,
        padding: 0,
    };

    const overlayStyle: CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(10, 10, 10, 0.79)",
        backdropFilter: "blur(10px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        zIndex: 9999,
    };

    const lyricsWrapperStyle: CSSProperties = {
        borderRadius: "0.2rem",
        padding: isMobile ? "0rem 2rem" : "0rem 5rem",
        maxHeight: "90vh",
        maxWidth: "90vw",
        overflowY: "auto",
        overflowX: "hidden",
    };

    const lyricsStyle: CSSProperties = {
        textAlign: "center",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflowWrap: "anywhere",
        fontSize: "0.9rem",
        lineHeight: "2rem",
        marginBottom: "0.2rem",
        color: "#fff",
    };

    const imageWrapperStyle: CSSProperties = {
        borderRadius: "0.2rem",
        overflow: "hidden",
        boxShadow: `
            0 0 20px rgba(0,0,0,0.8),
            0 0 40px rgba(0,0,0,0.6),
            0 0 80px rgba(0,0,0,0.4)
        `,
    };

    const imageStyle: CSSProperties = {
        maxWidth: "75vw",
        maxHeight: "75vh",
        objectFit: "contain",
        display: "block",
    };

    return {
        wrapper,
        toastItemStyle,
        closeButtonStyle,
        overlayStyle,
        toastStyle,
        lyricsWrapperStyle,
        lyricsStyle,
        imageWrapperStyle,
        imageStyle,
    };
}