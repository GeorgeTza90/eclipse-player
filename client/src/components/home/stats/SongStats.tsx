import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMiniPlayer } from "@/contexts/MiniPlayerContextWeb";
import { useAudio } from "@/contexts/AudioContextWeb";
import { useAuth } from "@/contexts/AuthContextWeb.tsx";
import { useLibrary } from "@/contexts/LibraryContextWeb";
import { fetchSongStats, fetchSongTotalPlays } from "@/services/GetService";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { getSongData } from "@/utils/getSong";
import { HistoryBucket, StatsRange } from "@/types/stats.types";
import { Song } from "@/types/songs.types";
import MiniPlayer from "@/components/player/mini/MiniPlayer";
import BackButton from "@/components/ui/buttons/BackButton";
import Loader from "@/components/ui/loaders/Loader";
import HistoryChart from "./historyChart/HistoryChart";
import ListSongItem from "./topSongList/parts/ListSongItem";
import styles from "./stats.module.css";
import RangeSelector from "./rangeSelector/RangeSelector";
import TotalListeningTime from "./total/TotalListeningTime";
import TotalPlays from "./total/TotalPlays";

const SongStats = () => {
    const [searchParams] = useSearchParams();
    const songId = Number(searchParams.get("songId"));
    const rangePreset = searchParams.get("range") as StatsRange;

    const { playlist: existingPlaylist, playSong } = useAudio();
    const { songs } = useLibrary();
    const { barMode } = useMiniPlayer();
    const { user } = useAuth();    

    const [range, setRange] = useState<StatsRange>(rangePreset ?? "1m");
    const [song, setSong] = useState<Song | null>();
    const [stats, setStats] = useState<HistoryBucket[] | null>(null);
    const [totalPlays, setTotalPlays] = useState<number>(0);
    const [totalPlaytime, setTotalPlaytime] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [localError, setLocalError] = useState<string>("");    

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
                return;
            }

            setLoading(true);

            try {
                const [statsData, totalPlays] = await Promise.all([fetchSongStats(songId, range), fetchSongTotalPlays(songId)]);
                setStats(statsData);
                setTotalPlays(totalPlays);
            } catch (err) {
                setLocalError(getErrorMessage(err, "Failed to load listening stats"));
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, [songId, range]);

    useEffect(() => {        
        const songData = getSongData(songId, songs);
        setSong(songData);        
    }, [songId, songs]);

    return (
        <div className={styles.container}>
            {user && !barMode && (<MiniPlayer />)}
            <div>
        {/* User Stats */}
                <h3 className={styles.text3}>{song?.title} - Statistics</h3>

        {/* Range selector */}
                <RangeSelector range={range} onClick={setRange}/>

        {/* Loaders & Errors */}
                {loading && <Loader text="Loading Listening Stats ..." size="1rem" />}
        
                {!loading && localError && (
                    <p className={styles.message}>{localError}</p>
                )}

                {!loading && !localError && !stats && (
                    <p className={styles.emptyState}>No listening history yet — play something!</p>
                )}

                {!loading && !localError && stats && (
                    <div className={styles.statsContainer}><br/>

        {/* Song Info */}
                        {song && <ListSongItem song={song} onClick={() => handlePlaySong(Number(song.id))}/>}<br/>

        {/* Total listening time */}                        
                        <TotalListeningTime total={totalPlaytime} />
                        <TotalPlays total={totalPlays} />                        

        {/* History chart */}                                                    
                        <HistoryChart history={stats} range={range} />                        
                    </div>
                )}

                <BackButton navTo={"/"}/>                
            </div>
        </div>
    );
}

export default SongStats;