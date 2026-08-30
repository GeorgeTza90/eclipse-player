import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import { useAudio } from "@/contexts/AudioContextWeb";
import { useAuth } from "@/contexts/AuthContextWeb.tsx";
import { useLibrary } from "@/contexts/LibraryContextWeb";
import { useIsMobile } from '@/hooks/useIsMobile';
import { fetchSongStats } from "@/services/GetService";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { formatDuration } from "@/utils/formatTime";
import { getSongData } from "@/utils/getSong";
import { RANGE_OPTIONS } from "@/utils/rangeOption";
import MiniPlayer from "@/components/player/mini/MiniPlayer";
import BackButton from "@/components/ui/buttons/BackButton";
import Loader from "@/components/ui/loaders/Loader";
import HistoryChart from "./HistoryChart";
import ListSongItem from "./ListSongItem";
import { HistoryBucket, StatsRange } from "@/types/stats.types";
import { Song } from "@/types/songs.types";
import styles from "./stats.module.css";

const SongStats = () => {
    const [searchParams] = useSearchParams();
    const songId = Number(searchParams.get("songId"));
    const rangePreset = searchParams.get("range") as StatsRange;

    const { playlist: existingPlaylist, playSong } = useAudio();
    const { songs } = useLibrary();
    const { barMode } = useMiniPlayer();
    const { user } = useAuth();
    const isMobile = useIsMobile();

    const [range, setRange] = useState<StatsRange>(rangePreset ?? "1m");
    const [song, setSong] = useState<Song | null>();
    const [stats, setStats] = useState<HistoryBucket[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [localError, setLocalError] = useState<string>("");
    const [totalPlaytime, setTotalPlaytime] = useState<number>(0);

    const handlePlaySong = (songId: number) => {
        const song = getSongData(songId, songs);
        const newPlaylist = song ? [song] : existingPlaylist;
        song && playSong(song, newPlaylist);
    };

    useEffect(() => {
        let total = 0;
        stats?.forEach((s) => total += Number(s.totalSeconds));
        setTotalPlaytime(total);
    }, [stats]);

    useEffect(() => {
        const loadStats = async () => {            
            if (Number.isNaN(songId)) {
                setLocalError("Missing song ID");
                setLoading(false);
                return
            }
            setLoading(true);

            try {                
                const statsData = await fetchSongStats(songId, range);
                const songData = await getSongData(songId, songs);
                setStats(statsData);
                setSong(songData);
            } catch (err) {
                setLocalError(getErrorMessage(err, "Failed to load listening stats"));
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, [songId, range]);

    return (
        <div className={styles.container}>
            {!isMobile && user && !barMode && (<MiniPlayer />)}
            <div>
                {/* User Stats */}
                <h3 className={styles.text3}>Your Statistics</h3>

                {/* Range selector */}
                <div className={styles.rangeSelector}>
                    {RANGE_OPTIONS.map((opt) => (
                        <button
                            key={opt.value}
                            className={range === opt.value ? styles.rangeActive : styles.rangeButton}
                            onClick={() => setRange(opt.value)}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                {loading && <Loader text="Loading Listening Stats ..." size="1rem" />}

                {!loading && localError && (
                    <p className={styles.message}>{localError}</p>
                )}

                {!loading && !localError && !stats && (
                    <p className={styles.emptyState}>No listening history yet — play something!</p>
                )}

                {!loading && !localError && stats && (
                    <div className={styles.statsContainer}><br/>

                        {song && <ListSongItem song={song} onClick={() => handlePlaySong(Number(song.id))}/>}<br/>

                        {/* Total listening time */}
                        <div className={styles.userInfo}>
                            Total Listening Time:
                            <p className={styles.statValue}>{formatDuration(totalPlaytime)}</p>
                        </div><br/>

                        {/* History chart */}
                        <div className={styles.section}>
                            <h3>Listening History</h3>
                            <HistoryChart history={stats} range={range} />
                        </div>
                    </div>
                )}<br/><br/><br/>

                <BackButton navTo={"/"}/>
                {isMobile && <><br/><br/><br/></>}
            </div>
        </div>
    );
}

export default SongStats;