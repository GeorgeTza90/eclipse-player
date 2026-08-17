import { useState } from "react";
import { useStylesToast } from "@/hooks/useStylesToast";

export const useLyricsToast = (lyrics: string | null) => {
    const [toastLyrics, setToastLyrics] = useState<string>("");
    const [visible, setVisible] = useState(false);    
    const { overlayStyle, lyricsWrapperStyle, lyricsStyle } = useStylesToast();

    const showLyricsToast = () => {
        setToastLyrics(lyrics ?? "");
        setVisible(true);    
    };    

    const LyricsToastUI = toastLyrics && visible && (
        <div style={overlayStyle} onClick={() => setVisible(false)}>
            <div style={lyricsWrapperStyle}>
                {lyrics ? (
                    <p style={lyricsStyle}>{lyrics}</p>
                ) : (
                    <p style={lyricsStyle}>No Lyrics Loaded</p>
                )}
            </div><br/><br/><br/><br/>
        </div>
    );

    return { showLyricsToast, LyricsToastUI };
};