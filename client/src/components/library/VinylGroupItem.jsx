import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useWidth } from "../../hooks/useScreen";
import { getGridConfig } from "../../utils/sizeSwitch";
import VinylCardSlot from "./VinylCardSlot";
import styles from "./vinylGroupItem.module.css";
import { useVinylPagination } from "../../hooks/useVinylPagination";

const VinylGroupItem = ({ type, group }) => {
    const navigate = useNavigate();

    const isArtist = type === "Artists";
    const isPrivate = type === "Private";

    const width = useWidth();
    const isMobile = useIsMobile();

    const { columns, rows } = getGridConfig(width);
    const itemsPerRow = columns * 1.8;       
    const pages = useVinylPagination(group, itemsPerRow, rows);

    const getType = () => {
        if (isPrivate) return "private";
        if (isArtist) return "artist";
        return "song";
    };

    const handleNavigate = (item) => {
        if (isPrivate) {
            navigate(`/library/PrivateCollectionDetail/${encodeURIComponent(item.album)}`);
        } else if (isArtist) {
            navigate(`/library/ArtistInfo/${encodeURIComponent(item.name)}`);
        } else {
            navigate(`/library/CollectionDetail/${encodeURIComponent(item.album)}`);
        }
    };

    const containerStyle = {marginLeft: isMobile ? `${width/1000}rem` : `${width/100}rem`  }

    return (
        <div className={styles.container} style={containerStyle}>
            <h2 className={styles.categoryTitle}>{type}</h2>
            <div className={styles.horizontalScroll}>
                {pages.map((page, pageIndex) => (
                    <div className={styles.page} key={pageIndex}>
                        {Array.from({ length: rows }).map((_, rowIndex) => {
                            const start = rowIndex * itemsPerRow;
                            const rowItems = page.slice(start, start + itemsPerRow);

                            return (
                                <div className={styles.row} key={rowIndex}>
                                    {rowItems.map((item) => (
                                        <VinylCardSlot
                                            key={isArtist ? item.name : item.id}
                                            item={item}
                                            type={getType()}
                                            onNavigate={() => handleNavigate(item)}
                                            className={styles.cardWrapper}
                                        />
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VinylGroupItem;