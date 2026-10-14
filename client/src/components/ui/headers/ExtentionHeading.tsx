import { headingProps } from "@/types/ui.types";
import styles from "./extentionHeading.module.css";

const ExtentionHeading = ({ text }: headingProps) => {
  return <h3 className={styles.heading}>{text}</h3>;
};

export default ExtentionHeading;
