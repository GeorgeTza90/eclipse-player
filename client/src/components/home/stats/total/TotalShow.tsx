import { TotalProps } from "@/types/stats.types";
import styles from "./totalShow.module.css";

const TotalShow = ({ total, text }: TotalProps) => {
  return (
    <div className={styles.userInfo}>
      {text}
      <p className={styles.statValue}>{total}</p>
    </div>
  );
};

export default TotalShow;
