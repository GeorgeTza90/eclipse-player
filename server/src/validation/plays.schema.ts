// validation/plays.schema.ts
import { z } from "zod";

export const createPlaySchema = z.object({
    songId: z.number().int().positive(),
    durationListenedSeconds: z.number().int().nonnegative(),
    songDurationSeconds: z.number().int().positive(),
});

export const statsRangeSchema = z.object({
    range: z.enum(["7d", "1m", "3m", "all"]).default("1m"),
});