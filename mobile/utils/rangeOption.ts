import { StatsRange } from "@/types/stats";

export const RANGE_OPTIONS: { value: StatsRange; label: string }[] = [
    { value: "7d", label: "Last 7 Days" },
    { value: "1m", label: "Last Month" },
    { value: "3m", label: "Last 3 Months" },
    { value: "all", label: "All Time" },
];