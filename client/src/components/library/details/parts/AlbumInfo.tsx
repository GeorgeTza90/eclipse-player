import { AlbumInfoProps } from "@/types/library.types";
import styles from "./albumInfo.module.css";
import hexToRgba from "@/utils/hexToRgba";
import { groupArtistsByRole } from "@/utils/groupArtistsByRole";
import ArtistButton from "@/components/ui/buttons/ArtistButton";

const AlbumInfo = ({ albumInfo, albumSongs, onImageClick, durationString}: AlbumInfoProps) => {
    const { mainArtists } = groupArtistsByRole(albumInfo.artists);
    const headerStyle = { background: `linear-gradient(to bottom, ${hexToRgba(albumSongs[0].averageColor, 0.1)}, #55555500 )` }

    return (
        <div className={styles.header} style={headerStyle}>
            {albumInfo.image && (
                <img src={albumInfo.image} alt={albumInfo.album} className={styles.albumImage} onClick={onImageClick} />
            )}            
            <div className={styles.headerInfo}>
                <p className={styles.type}>{albumInfo.type.toUpperCase()}</p>
                <p className={styles.albumName}>{albumInfo.album}</p>
                <p className={styles.artistInfo}>
                    {mainArtists.map((artist) => (
                        <span key={artist}>
                            <ArtistButton artist={artist || "Artist Name"} size="0.9rem" />
                            {"• "}
                        </span>
                    ))}                            
                    {albumSongs.length} songs • {durationString}
                </p>
            </div>
        </div>
    );
}

export default AlbumInfo;