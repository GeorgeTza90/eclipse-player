import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useWidth } from "../../hooks/useScreen";
import { getGridConfig } from "../../utils/sizeSwitch";
import CollectionCard from "./CollectionCard";
import styles from "./libraryGroupItem.module.css";

const LibraryGroupItem = ({ type, group }) => {
    const navigate = useNavigate();
    const isArtist = type === "Artists";
    const isPrivate = type === "Private";
    const width = useWidth();
    const isMobile = useIsMobile();
    const {columns, rows} = getGridConfig(width);

    /* --- STYLES --- */
    const containerStyle = {marginLeft: isMobile ? `${width/1000}rem` : `${width/100}rem`  }
    const horizontalScrollStyle = {        
        gridTemplateColumns: isMobile ? `repeat(${columns} , 6.5rem)` : `repeat(${columns}, 7rem)`,        
        gap: isMobile ? "1rem" : "2.4rem",        
    };    

    return (
        <div className={styles.container} style={containerStyle}>
            <h2 className={styles.categoryTitle}>{type}</h2>
            <div className={styles.horizontalScroll} style={horizontalScrollStyle}>
                {group.map((item) => (                    
                    <CollectionCard
                        key={isArtist ? item.name : item.id}
                        item={item}
                        type={isPrivate ? "private" : (isArtist ? "artist" : "song")}
                        onClick={() =>
                            navigate(
                                isPrivate 
                                    ? `/library/PrivateCollectionDetail/${encodeURIComponent(item.album)}`
                                    : isArtist
                                        ? `/library/ArtistInfo/${encodeURIComponent(item.name)}`
                                        : `/library/CollectionDetail/${encodeURIComponent(item.album)}`
                            )
                        }
                    />
                ))}
            </div>
        </div>
    );
}

export default LibraryGroupItem