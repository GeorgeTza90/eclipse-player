import { getSongData } from "@/utils/getSong";
import { TopSongsListProps } from "@/types/stats.types";
import { useAudio } from "@/contexts/AudioContextWeb";
import { useLibrary } from "@/contexts/LibraryContextWeb";
import styles from "./topSongsList.module.css";
import ListSongItem from "./ListSongItem";

const TopSongsList = ({ topSongs }: TopSongsListProps) => {
    const { playlist: existingPlaylist, playSong } = useAudio();
    const { songs } = useLibrary();

    const handlePlaySong = (songId: number) => {
        const song = getSongData(songId, songs);
        const newPlaylist = song ? [song] : existingPlaylist;
        song && playSong(song, newPlaylist);
    };

    return (
        <div className={styles.section}>
            <ul className={styles.topSongsList}>
                {topSongs.map((song, i) => (
                    <li key={song.song_id} className={styles.topSongItem}>
                        <span className={styles.rank}>{i + 1}. </span>

                        <ListSongItem
                            song={getSongData(song.song_id, songs)}
                            onClick={() => handlePlaySong(song.song_id)}
                        />

                        <span className={styles.playCount}>{song.playCount} plays</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopSongsList;