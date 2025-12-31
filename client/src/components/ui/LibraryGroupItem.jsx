import { useNavigate } from "react-router-dom";
import CollectionCard from "../library/CollectionCard";
import styles from "./libraryGroupItem.module.css";

export default function LibraryGroupItem({ type, group }) {
    const navigate = useNavigate();
    const isArtist = type === "Artists";

    return (
        <>
            <h2 className={styles.categoryTitle}>{type}</h2>
            <div className={styles.horizontalScroll}>
                {group.map((item) => (
                    <CollectionCard
                        key={isArtist ? item.name : item.id}
                        item={item}
                        type={isArtist ? "artist" : "song"}
                        onClick={() =>
                            navigate(
                                isArtist
                                    ? `/library/ArtistInfo?artist=${encodeURIComponent(item.name)}`
                                    : `/library/CollectionDetail?album=${encodeURIComponent(item.album)}`
                            )
                        }
                    />
                ))}
            </div>
        </>
    );
}