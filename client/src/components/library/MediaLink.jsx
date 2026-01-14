import styles from "./mediaLink.module.css";

export default function MediaLink({ platform, link }) {
  if (!link) return null;

  return (
    <a
      href={link}
      className={`${styles.contactIcon} ${styles[platform]}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={platform}
    />
  );
}
