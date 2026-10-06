import { useMemo } from "react";
import { HistoryBucket, Listeners } from "@/types/stats.types";

export const useTotalPlaytime = (stats: HistoryBucket[] | null) => {
    return useMemo(() => {
        return stats?.reduce(
            (total, stat) => total + Number(stat.totalSeconds),
            0
        ) ?? 0;
    }, [stats]);
};

export const useTotalListeners = (listeners: Listeners[] | null) => {
    return useMemo(() => {
        return listeners?.length ?? 0;
    }, [listeners]);
};