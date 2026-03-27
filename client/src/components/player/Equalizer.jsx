import { useMemo } from "react";
import { useAudio } from "../../contexts/AudioContextWeb";
import styles from "./equalizer.module.css";
import { useIsMobile } from "../../hooks/useIsMobile";
import { EQ_BANDS } from "../../utils/defaultEQ";

export default function Equalizer({ color }) {
  const isMobile = useIsMobile();
  const { setEQGain, resetEQ, EQGain } = useAudio();

  const frequencies = useMemo(() => (
    isMobile
      ? EQ_BANDS.filter(b => [100, 250, 630, 1600, 4000, 10000, 16000, 20000].includes(b.value))
      : EQ_BANDS
  ), [isMobile]);

  return (
    <div className={styles.divContainer}>
      <h3 className={styles.heading}>Graphic EQ</h3>
      <div className={styles.EQcontainer}>
        <div className={styles.linesDiv}>
          {Array(isMobile ? 12 : 16).fill(0).map((_, i) => <hr key={i} className={styles.line}/>)}
        </div>
        {frequencies.map(band => (
          <div key={band.label} className={styles.sliderWrapper}>
            <input
              type="range"
              min={-7}
              max={7}
              step={1}
              value={EQGain[band.label] ?? 0}
              className={styles.verticalSlider}
              style={{ accentColor: color }}
              onChange={e => setEQGain(band.label, Number(e.target.value))}
            />
            <span className={styles.label}>{band.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.buttons}>
        <button className={styles.resetButton} onClick={resetEQ}>Reset</button>
        <button className={styles.inActiveButton}>Save</button>
        <button className={styles.inActiveButton}>Load</button>
      </div>
      <div className={styles.info}>
        <h2 className={styles.infoText}>Equalizer is in Test Mode</h2>
        <h2 className={styles.infoText}>Preset Save and Load soon available</h2>        
      </div>
    </div>
  );
}