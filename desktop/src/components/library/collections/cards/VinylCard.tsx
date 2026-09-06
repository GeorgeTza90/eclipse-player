import { useState } from "react";
import { VinylCardProps } from "@/types/library.types";
import styles from "./vinylCard.module.css";

const VinylCard = ({ item, onClick }: VinylCardProps) => {    
    const [, setHover] = useState(false);
    
    return (
        <div
            className={styles.trackContainer}
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {item.image && (
                <>
                    <div className={styles.imageDiv}>
                        <div className={styles.blackOverlay}/>
                        <img src={encodeURI(item.image)} alt={item.album} className={styles.albumImage}/>
                    </div>
                    <div className={styles.vinylImage}>
                        <img src={encodeURI("/assets/images/vinylImage.png")} alt={item.album} className={styles.albumImageVinyl}/>
                        <img src={encodeURI(item.image)} alt={item.album} className={styles.albumImageOnVinyl}/>
                    </div>
                </>
            )}
        </div>
    );
};

export default VinylCard;