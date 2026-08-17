import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useWidth } from "@/hooks/useScreen";
import { getGridConfig } from "@/utils/sizeSwitch";
import { useVinylPagination } from "@/hooks/useVinylPagination";
import type { Song } from "@/types/songs.types";
import type { VinylGroupItemProps } from "@/types/vinyl.types";
import VinylCardSlot from "./cards/VinylCardSlot";
import styles from "./vinylGroupItem.module.css";

const VinylGroupItem = ({ type, group }: VinylGroupItemProps) => {
    const navigate = useNavigate();

    const isPrivate = type === "Private";

    const width = useWidth();
    const isMobile = useIsMobile();

    const { columns, rows } = getGridConfig(width);
    const itemsPerRow = columns * 1.8;
    const pages = useVinylPagination(group, itemsPerRow, rows);

    const getType = () => {
        if (isPrivate) return "private";
        return "song";
    };

    const handleNavigate = (item: Song) => {
        if (isPrivate) {
            navigate(`/library/PrivateCollectionDetail/${encodeURIComponent(item.album)}`);
            return;
        }

        navigate(`/library/CollectionDetail/${encodeURIComponent(item.album)}`);
    };

    const containerStyle = { marginLeft: isMobile ? `${width / 1000}rem` : `${width / 100}rem` };

    return (
        <div className={styles.container} style={containerStyle}>
            <h2 className={styles.categoryTitle}>{type}</h2>
            {group.length === 0 ? (
                <p className={styles.emptyText}>No items yet</p>
            ) : (
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
                                                key={item.id}
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
            )}
        </div>
    );
};

export default VinylGroupItem;

