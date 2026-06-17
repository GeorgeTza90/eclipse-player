import { useState } from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";

export const useLyricsToast = (lyrics) => {
    const [toastLyrics, setToastLyrics] = useState(null);
    const [visible, setVisible] = useState(false);
    const isMobile = useIsMobile();

    const showLyricsToast = () => {
        setToastLyrics(lyrics);
        setVisible(true);    
    };

    const overlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.72)",
        backdropFilter: "blur(10px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",        
        cursor: "pointer",
        zIndex: 9999,    
    };

    const lyricsWrapperStyle = {
        borderRadius: "0.2rem",
        padding: isMobile ? "0rem 2rem" : "0rem 5rem",
        maxHeight: "90vh",
        maxWidth: "90vw",
        overflowY: "auto",
        overflowX: "hidden",
        boxShadow: `
            0 0 20px rgba(0,0,0,0.8),
            0 0 40px rgba(0,0,0,0.6),
            0 0 80px rgba(0,0,0,0.4)
        `,
    };

    const lyricsStyle = {
        textAlign: "center",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflowWrap: "anywhere",
        fontSize: "0.9rem",
        lineHeight: "2rem",
        marginBottom: "0.2rem",
        color: "#fff",        
    };

    const LyricsToastUI = toastLyrics && visible && (
        <div style={overlayStyle} onClick={() => setVisible(false)}>
            <div style={lyricsWrapperStyle}>
                {lyrics ? (
                    // lyrics.split("\n").map((line, i) => (
                    //     <p key={i} style={lyricsStyle}>{line || "\u00A0"}</p>
                    // ))
                        <p style={lyricsStyle}>{lyrics}</p>
                ) : (
                    !lyrics ? (<p lyrics={lyricsStyle}>No Lyrics Loaded</p>) : (<p className={styles.lyrics}>No Lyrics Yet</p>)                    
                )}                
            </div><br/><br/><br/><br/>
        </div>
    );

    return { showLyricsToast, LyricsToastUI };
};