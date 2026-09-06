import { useEffect, useState } from "react";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import { useAuth } from "@/contexts/AuthContextWeb.tsx";
import { fetchPlayStats } from "@/services/GetService";
import { RANGE_OPTIONS } from "@/utils/rangeOption";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { formatDuration } from "@/utils/formatTime";
import Loader from "@/components/ui/loaders/Loader";
import MiniPlayer from "@/components/player/mini/MiniPlayer";
import BackButton from "@/components/ui/buttons/BackButton";
import { PlayStats, StatsRange } from "@/types/stats.types";
import TopSongsList from "./TopSongsList";
import HistoryChart from "./HistoryChart";
import styles from "./stats.module.css";

const Stats = () => {
    const { barMode } = useMiniPlayer();
    const { user } = useAuth();    

    const [range, setRange] = useState<StatsRange>("1m");
    const [stats, setStats] = useState<PlayStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [localError, setLocalError] = useState<string>("");

    useEffect(() => {
        const loadStats = async () => {
            setLoading(true);
            try {
                const data = await fetchPlayStats(range);
                setStats(data);
            } catch (err) {
                setLocalError(getErrorMessage(err, "Failed to load listening stats"));
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, [range]);   

    return (
        <div className={styles.container}>
            {user && !barMode && (<MiniPlayer />)}
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

        {/* Loaders & Errors */}
                {loading && <Loader text="Loading Listening Stats ..." size="5vh" />}

                {!loading && localError && (
                    <p className={styles.message}>{localError}</p>
                )}

                {!loading && !localError && stats && stats.topSongs.length === 0 && (
                    <p className={styles.emptyState}>No listening history yet — play something!</p>
                )}

                {!loading && !localError && stats && stats.topSongs.length > 0 && (
                    <div className={styles.statsContainer}>
                        
        {/* Total listening time */}
                        <div className={styles.userInfo}>
                            Total Listening Time:
                            <p className={styles.statValue}>{formatDuration(stats.totalSeconds)}</p>
                        </div>

        {/* Top songs */}
                        <h3>Top Songs</h3>
                        <div>
                            <TopSongsList topSongs={stats.topSongs}/>
                        </div><br/><br/>

        {/* History chart */}
                        <div className={styles.section}>
                            <h3>Listening History</h3>
                            <HistoryChart history={stats.history} range={range} />
                        </div>
                    </div>
                )}<br/><br/><br/>

                <BackButton navTo={"/"}/>                
            </div>
        </div>
    );
}

export default Stats;