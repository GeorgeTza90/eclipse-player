import { useState } from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { useStylesToast } from "../../../hooks/useStylesToast";

export const useLyricsToast = (lyrics) => {
    const [toastLyrics, setToastLyrics] = useState(null);
    const [visible, setVisible] = useState(false);
    const isMobile = useIsMobile();
    const { overlayStyle, lyricsWrapperStyle, lyricsStyle } = useStylesToast();

    const showLyricsToast = () => {
        setToastLyrics(lyrics);
        setVisible(true);    
    };    

    const LyricsToastUI = toastLyrics && visible && (
        <div style={overlayStyle} onClick={() => setVisible(false)}>
            <div style={lyricsWrapperStyle}>
                {lyrics ? (
                        <p style={lyricsStyle}>{lyrics}</p>
                ) : (
                    !lyrics ? (<p lyrics={lyricsStyle}>No Lyrics Loaded</p>) : (<p className={styles.lyrics}>No Lyrics Yet</p>)                    
                )}                
            </div><br/><br/><br/><br/>
        </div>
    );

    return { showLyricsToast, LyricsToastUI };
};