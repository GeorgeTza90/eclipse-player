// validation/plays.schema.ts
import { z } from "zod";

export const createPlaySchema = z.object({
    songId: z.number().int().positive(),
    durationListenedSeconds: z.number().int().nonnegative(),
    songDurationSeconds: z.number().int().positive(),
});