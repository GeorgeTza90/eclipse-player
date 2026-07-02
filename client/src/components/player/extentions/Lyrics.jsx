import { useLyricsToast } from "../../ui/toasts/LyricsToast";
import styles from "./lyrics.module.css";

const Lyrics = ({ currentSong, onClick }) => {
    const { showLyricsToast, LyricsToastUI } = useLyricsToast(currentSong.lyrics);

    return (<>
        <div className={styles.container}>
            <div className={styles.heading}>
                <h3>{currentSong?.title} - Lyrics {" "} </h3>
                
                <button
                    onClick={() => showLyricsToast()}
                    className={styles.magnifyButton}
                />
            </div>
            <div className={styles.list}>
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
