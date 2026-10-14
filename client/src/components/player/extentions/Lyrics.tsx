import { LyricsProps } from "@/types/player.types";
import { useLyricsToast } from "@/components/ui/toasts/LyricsToast";
import { getHeightConfig } from "@/utils/sizeSwitch";
import { useHeight } from "@/hooks/useScreen";
import { useIsMobile } from "@/hooks/useIsMobile";
import styles from "./lyrics.module.css";
import { useEffect, useState } from "react";
import ExtentionHeading from "@/components/ui/headers/ExtentionHeading";

const Lyrics = ({ currentSong }: LyricsProps) => {
  const { showLyricsToast, LyricsToastUI } = useLyricsToast(currentSong.lyrics ?? "No Lyrics Yet");
  const isMobile = useIsMobile();

  const [heading, setHeading] = useState("Lyrics");

  const height = useHeight();
  const { maxHeight } = getHeightConfig(height, true, isMobile);
  const ListStyle = { maxHeight: `${maxHeight}px` };

  useEffect(() => setHeading(`${currentSong.title} - Lyrics`), [currentSong.title]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.heading}>
          <ExtentionHeading text={heading} />
          <button onClick={() => showLyricsToast()} className={styles.magnifyButton} />
        </div>

        <div className={styles.list} style={ListStyle}>
          {currentSong?.lyrics ? (
            currentSong.lyrics.split("\n").map((line, i) => (
              <p key={i} className={styles.lyrics}>
                {line || "\u00A0"}
              </p>
            ))
          ) : !currentSong ? (
            <p className={styles.lyrics}>No Song Loaded</p>
          ) : (
            <p className={styles.lyrics}>No Lyrics Yet</p>
          )}
        </div>
      </div>

      {LyricsToastUI}
    </>
  );
};

export default Lyrics;
