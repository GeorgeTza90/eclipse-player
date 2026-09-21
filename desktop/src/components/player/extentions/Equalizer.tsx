import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import type { EqualizerProps } from "@/types/player.types";
import LinedBackground from "@/components/ui/lines/LinedBackground";
import EqSliders from "./equalizer/EqSliders";
import EqPresets from "./equalizer/EqPresets";
import styles from "./equalizer.module.css";

const Equalizer = ({ color }: EqualizerProps) => {    
    const { goRGB } = useMiniPlayer();

    return (
        <div className={styles.divContainer}>
    {/* Equalizer */}
            <h3 className={styles.heading}>Graphic EQ</h3>
            <div className={styles.EQcontainer}>
                <LinedBackground />
                <EqSliders goRGB={goRGB} color={color} />
            </div>            

    {/* Presets */}
            <EqPresets />
        </div>
    );
}

export default Equalizer;