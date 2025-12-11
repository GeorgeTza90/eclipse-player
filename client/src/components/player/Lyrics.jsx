import styles from "./lyrics.module.css";

export default function Lyrics({ currentSong }) {
    if (!currentSong) return <p>No Song Selected</p>;

    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>{currentSong.title} - Lyrics</h3>
            <div className={styles.list}>
                {currentSong.lyrics ? (
                    currentSong.lyrics.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                    ))
                ) : (
                    <p>No Lyrics Yet</p>
                )}
            </div>
        </div>
    );
}
