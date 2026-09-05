import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { formatBucketLabel } from "@/utils/formatBarChart";
import type { HistoryChartProps } from "@/types/stats.types";
import styles from "./historyChart.module.css";

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
                        cursor={false}
                        contentStyle={{ backgroundColor: "#1a1a1a", border: "none", borderRadius: "0.5rem" }}
                        labelStyle={{ color: "#f7f7f7" }}
                    />
                    <Bar dataKey="plays" fill="#969595" radius={[4, 4, 0, 0]} activeBar={{ fill: "#d1d1d1" }} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HistoryChart;