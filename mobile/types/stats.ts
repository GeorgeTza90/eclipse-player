import { MouseEventHandler } from "react";
import { Song } from "@/types/songs";

export interface TopSong {
    song_id: number;
    playCount: number;
}

export interface MonthlyStat {
    month: string;
    playCount: number;
    totalSeconds: number;
}

export interface PlayStats {
    topSongs: TopSong[];
    totalSeconds: number;
    history: HistoryBucket[];
}

export interface ListSongItemProps {
    song: Song | null;
    onClick: MouseEventHandler<HTMLDivElement>;
}

export interface TopSongsListProps {
    topSongs: TopSong[];
}

export type StatsRange = "7d" | "1m" | "3m" | "all";

export interface HistoryBucket {
    bucket: string;
    playCount: number;
    totalSeconds: number;
}

export interface HistoryBucket {
    bucket: string;
    playCount: number;
    totalSeconds: number;
}

export interface HistoryChartProps {
    history: HistoryBucket[];
    range: StatsRange;
}



