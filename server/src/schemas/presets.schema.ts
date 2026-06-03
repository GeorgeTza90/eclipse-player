import { z } from "zod";

// EQ preset = frequency -> gain map
const presetSchema = z.record(z.string(), z.number());

export const createPresetSchema = z.object({
    title: z.string().min(1),
    preset: presetSchema,
});

export const updatePresetSchema = z.object({
    title: z.string().min(1),
    preset: presetSchema,
});

export const deletePresetSchema = z.object({
    id: z.coerce.number(),
});