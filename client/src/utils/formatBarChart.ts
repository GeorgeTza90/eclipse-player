import { StatsRange } from "@/types/stats.types";

export function formatBucketLabel (bucket: string, range: StatsRange): string {
    if (range === "all") {
        const [year, month] = bucket.split("-");
        const date = new Date(Number(year), Number(month) - 1);

        return date.toLocaleDateString("en-US", {
            month: "short",
            year: "2-digit",
        });
    }

    if (range === "3m") {
        const [year, week] = bucket.split("-").map(Number);

        const date = new Date(year, 0, 1 + (week - 1) * 7);
        const day = date.getDay();
        const monday = new Date(date);

        monday.setDate(date.getDate() - (day === 0 ? 6 : day - 1));

        return monday.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    }

    const date = new Date(bucket);

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
};
