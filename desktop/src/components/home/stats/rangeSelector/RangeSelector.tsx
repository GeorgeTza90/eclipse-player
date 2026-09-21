import { RANGE_OPTIONS } from "@/utils/rangeOption";
import { RangeSelectorProps } from "@/types/stats.types";
import styles from "./rangeSelector.module.css";

const RangeSelector = ({ range, onClick }: RangeSelectorProps) => {
    return (
        <div className={styles.rangeSelector}>
            {RANGE_OPTIONS.map((opt) => (
                <button
                    key={opt.value}
                    className={range === opt.value ? styles.rangeActive : styles.rangeButton}
                    onClick={() => onClick(opt.value)}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}

export default RangeSelector;