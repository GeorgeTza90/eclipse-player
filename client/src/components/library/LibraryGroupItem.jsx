import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../../hooks/useIsMobile";
import { getGridConfig } from "../../utils/sizeSwitch";
import { useWidth } from "../../hooks/useScreen";
import CollectionCard from "./CollectionCard";
import styles from "./libraryGroupItem.module.css";

export default function LibraryGroupItem({ type, group }) {
    const navigate = useNavigate();
    const isArtist = type === "Artists";
    const isPrivate = type === "Private";
    const width = useWidth();
    const isMobile = useIsMobile();
    const {columns, rows} = getGridConfig(width);    
        
    const horizontalScrollStyle = {
        display: "grid",
        gridTemplateColumns: isMobile ? `repeat(3, 6.5rem)` : `repeat(${columns}, 8rem)`,        
        gap: isMobile ? "2rem" : "2.4rem",
        marginLeft: width < 800 ? "" : "",        
    };    

    return (
        <div className={styles.container}>
            <h2 className={styles.categoryTitle}>{type}</h2>

            <div
                className={styles.horizontalScroll}
                style={horizontalScrollStyle}
            >
                {group.map((item) => (
                    <CollectionCard
                        key={isArtist ? item.name : item.id}
                        item={item}
                        type={isPrivate ? "private" : (isArtist ? "artist" : "song")}
                        onClick={() =>
                            navigate(
                                isPrivate ? `/library/PrivateCollectionDetail?album=${encodeURIComponent(item.album)}` : ( 
                                    isArtist
                                        ? `/library/ArtistInfo?artist=${encodeURIComponent(item.name)}`
                                        : `/library/CollectionDetail?album=${encodeURIComponent(item.album)}` 
                                )
                            )
                        }
                    />
                ))}
            </div>
        </div>
    );
}