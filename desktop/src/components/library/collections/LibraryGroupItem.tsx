import { useNavigate } from "react-router-dom";
import { useStylesLibrary } from "@/hooks/useStylesLibrary";
import CollectionCard from "./cards/CollectionCard";
import type { GroupItemProps } from "@/types/library.types";
import type { Song } from "@/types/songs.types";
import type { Artist } from "@/types/artists.types";
import styles from "./libraryGroupItem.module.css";

const LibraryGroupItem = ({ type, group }: GroupItemProps) => {
    const navigate = useNavigate();
    const { containerStyle, horizontalScrollStyle } = useStylesLibrary({})
    const isArtist = type === "Artists";
    const isPrivate = type === "Private";

    return (
        <div className={styles.container} style={containerStyle}>
            <h2 className={styles.categoryTitle}>{type}</h2>
            {group.length === 0 ? (
                <p className={styles.emptyText}>No items yet</p>
            ) : (
                <div className={styles.horizontalScroll} style={horizontalScrollStyle}>
                    {group.map((item) => (
                        <CollectionCard
                            key={item.id}
                            item={item}
                            type={isPrivate ? "private" : (isArtist ? "artist" : "song")}
                            onClick={() =>
                                navigate(
                                    isPrivate 
                                        ? `/library/PrivateCollectionDetail/${encodeURIComponent((item as Song).album)}`
                                        : isArtist
                                            ? `/library/ArtistInfo/${encodeURIComponent((item as Artist).name)}`
                                            : `/library/CollectionDetail/${encodeURIComponent((item as Song).album)}`
                                )
                            }
                        />
                    ))}
                </div>
            )}
            
        </div>
    );
}

export default LibraryGroupItem