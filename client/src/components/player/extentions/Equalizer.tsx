import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import type { EqualizerProps } from "@/types/player.types";
import LinedBackground from "@/components/ui/lines/LinedBackground";
import EqSliders from "./equalizer/EqSliders";
import EqPresets from "./equalizer/EqPresets";
import styles from "./equalizer.module.css";
import ExtentionHeading from "@/components/ui/headers/ExtentionHeading";

const Equalizer = ({ color }: EqualizerProps) => {
  const { goRGB } = useMiniPlayer();

  return (
    <div className={styles.container}>
      {/* Equalizer */}
      <ExtentionHeading text={"Graphic EQ"} />
      <div className={styles.EQcontainer}>
        <LinedBackground />
        <EqSliders goRGB={goRGB} color={color} />
      </div>

      {/* Presets */}
      <EqPresets />
    </div>
  );
};

export default Equalizer;
