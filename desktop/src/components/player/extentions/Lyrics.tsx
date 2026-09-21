import { LyricsProps } from "@/types/player.types";
import { useLyricsToast } from "@/components/ui/toasts/LyricsToast";
import { getHeightConfig } from "@/utils/sizeSwitch";
import { useHeight } from "@/hooks/useScreen";
import styles from "./lyrics.module.css";

const Lyrics = ({ currentSong }: LyricsProps) => {     
    const { showLyricsToast, LyricsToastUI } = useLyricsToast(currentSong.lyrics ?? "No Lyrics Yet");
    
    const height = useHeight();
    const { maxHeight } = getHeightConfig(height, true);
    const ListStyle = { maxHeight: `${maxHeight}px` }

    return (<>
        <div className={styles.container}>
            <div className={styles.heading}>
                <h3>{currentSong?.title} - Lyrics {" "} </h3>
                
                <button
                    onClick={() => showLyricsToast()}
                    className={styles.magnifyButton}
                />
            </div>
            <div className={styles.list} style={ListStyle}>
                {currentSong?.lyrics ? (
                    currentSong.lyrics.split("\n").map((line, i) => (
                        <p key={i} className={styles.lyrics}>{line || "\u00A0"}</p>
                    ))
                ) : (
                    !currentSong ? (<p className={styles.lyrics}>No Song Loaded</p>) : (<p className={styles.lyrics}>No Lyrics Yet</p>)                    
                )}
            </div>
        </div><br/><br/><br/><br/>
        {LyricsToastUI}
    </>);
}

export default Lyrics;
