import { useEffect, useState } from "react";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import { useAuth } from "@/contexts/AuthContextWeb.tsx";
import { useIsMobile } from '@/hooks/useIsMobile';
import { fetchPlayStats } from "@/services/GetService";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { PlayStats, StatsRange } from "@/types/stats.types";
import Loader from "@/components/ui/loaders/Loader";
import MiniPlayer from "@/components/player/mini/MiniPlayer";
import BackButton from "@/components/ui/buttons/BackButton";
import TopSongsList from "./topSongList/TopSongsList";
import HistoryChart from "./historyChart/HistoryChart";
import styles from "./stats.module.css";
import TotalListeningTime from "./total/TotalListeningTime";
import RangeSelector from "./rangeSelector/RangeSelector";

const Stats = () => {
    const { barMode } = useMiniPlayer();
    const { user } = useAuth();
    const isMobile = useIsMobile();

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

    return (<>
        <div className={styles.container}>
            {!isMobile && user && !barMode && (<MiniPlayer />)}
            <div>
        {/* User Stats */}
                <h3 className={styles.text3}>Your Statistics</h3>

        {/* Range selector */}
                <RangeSelector range={range} onClick={setRange}/>

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
                        <TotalListeningTime total={stats.totalSeconds} />

        {/* Top songs */}                        
                        <TopSongsList topSongs={stats.topSongs}/>                        

        {/* History chart */}                                                    
                        <HistoryChart history={stats.history} range={range} />                        
                    </div>
                )}

                <BackButton navTo={"/"}/>                
            </div>
        </div>
   </>);
}

export default Stats;