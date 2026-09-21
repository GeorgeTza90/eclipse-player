import { useAudio } from "@/contexts/AudioContextWeb";
import { EQ_BANDS } from "@/utils/defaultEQ";
import type { EqSlidersProps } from "@/types/player.types";
import styles from "./eqSliders.module.css";

const EqSliders = ({ goRGB, color }: EqSlidersProps) => {    
    const { setEQGain, EQGain } = useAudio();
    const frequencies = EQ_BANDS;

    return (        
        frequencies.map(band => (
            <div key={band.label} className={styles.sliderWrapper}>
                <input
                    type="range"
                    min={-7}
                    max={7}
                    step={1}
                    value={EQGain[band.label] ?? 0}
                    className={styles.verticalSlider}
                    style={{ accentColor: goRGB ? "#acacac" : color }}
                    onChange={e => setEQGain(band.label, Number(e.target.value))}
                />
                <span className={styles.label}>{band.label}</span>
            </div>
        ))        
    );
}

export default EqSliders;