import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useWidth } from "../../hooks/useScreen";
import { getGridConfig } from "../../utils/sizeSwitch";
import VinylCardSlot from "./VinylCardSlot";
import styles from "./vinylGroupItem.module.css";

const LibraryGroupItem = ({ type, group }) => {
    const navigate = useNavigate();

    const isArtist = type === "Artists";
    const isPrivate = type === "Private";

    const width = useWidth();
    const isMobile = useIsMobile();

    const { columns, rows } = getGridConfig(width);

    const itemsPerRow = isMobile ? 3 : columns * 2;
    const rowsCount = rows;

    const pages = [];

    for (let i = 0; i < group.length; i += itemsPerRow * rowsCount) {
        pages.push(group.slice(i, i + itemsPerRow * rowsCount));
    }

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

    return (
        <div className={styles.container}>
            <h2 className={styles.categoryTitle}>{type}</h2>

            <div
                className={styles.horizontalScroll}
                style={{
                    gridTemplateColumns: isMobile
                        ? `repeat(${itemsPerRow}, 6.5rem)`
                        : `repeat(${itemsPerRow}, 8rem)`,
                    gap: isMobile ? "2rem" : "2.4rem",
                }}
            >
                {pages.map((page, pageIndex) => {
                    const row1 = page.slice(0, itemsPerRow);
                    const row2 = page.slice(itemsPerRow);

                    return (
                        <div className={styles.page} key={pageIndex}>

                            <div className={styles.row}>
                                {row1.map((item) => (
                                    <VinylCardSlot
                                        key={isArtist ? item.name : item.id}
                                        item={item}
                                        type={getType()}
                                        onNavigate={() => handleNavigate(item)}
                                        className={styles.cardWrapper}
                                    />
                                ))}
                            </div>

                            <div className={styles.row}>
                                {row2.map((item) => (
                                    <VinylCardSlot
                                        key={isArtist ? item.name : item.id}
                                        item={item}
                                        type={getType()}
                                        onNavigate={() => handleNavigate(item)}
                                        className={styles.cardWrapper}
                                    />
                                ))}
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LibraryGroupItem;