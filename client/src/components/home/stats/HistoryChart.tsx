import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { HistoryBucket, StatsRange } from "@/types/stats.types";
import styles from "./historyChart.module.css";

interface HistoryChartProps {
    history: HistoryBucket[];
    range: StatsRange;
}

const formatBucketLabel = (bucket: string, range: StatsRange): string => {
    if (range === "all") {
        const [year, month] = bucket.split("-");
        const date = new Date(Number(year), Number(month) - 1);
        return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    }
    if (range === "3m") return bucket.replace(/^\d{4}-/, "W");
    
    const date = new Date(bucket);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const HistoryChart = ({ history, range }: HistoryChartProps) => {
    const chartData = history.map((h) => ({
        label: formatBucketLabel(h.bucket, range),
        plays: h.playCount,
        minutes: Math.round(h.totalSeconds / 60),
    }));

    return (
        <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} barCategoryGap="45%">
                    <XAxis dataKey="label" stroke="#9e9e9e" fontSize={12} />
                    <YAxis stroke="#9e9e9e" fontSize={12} />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#1a1a1a", border: "none", borderRadius: "0.5rem" }}
                        labelStyle={{ color: "#f7f7f7" }}
                    />
                    <Bar dataKey="plays" fill="#c6c6c6" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HistoryChart;