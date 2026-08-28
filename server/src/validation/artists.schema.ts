import { z } from "zod";

export const getArtistSchema = z.object({
    name: z.string().max(30),
});