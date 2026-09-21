import { useMemo } from "react";
import { useAudio } from "@/contexts/AudioContextWeb";
import { useIsMobile } from "@/hooks/useIsMobile";
import { EQ_BANDS } from "@/utils/defaultEQ";
import type { EqSlidersProps } from "@/types/player.types";
import styles from "./eqSliders.module.css";

const EqSliders = ({ goRGB, color }: EqSlidersProps) => {
    const isMobile = useIsMobile();
    const { setEQGain, EQGain } = useAudio();

    const frequencies = useMemo(() => (
        isMobile
            ? EQ_BANDS.filter(b => [63, 100, 250, 630, 1600, 4000, 10000, 16000].includes(b.value))
            : EQ_BANDS
    ), [isMobile]);

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