import { z } from "zod";

const numericIdRegex = /^\d+$/;

export const playlistIdSchema = z.object({
    id: z.string().regex(numericIdRegex, "id must be numeric"),
});

export const songIdSchema = z.object({
    songId: z.number(),
});

export const getAllIdsSchema = z.object({    
    id: z.string().regex(numericIdRegex, "id must be numeric"),
    songId: z.string().regex(numericIdRegex, "songId must be numeric"),    
});

export const newOrderSchema = z.object({
    newOrder: z.number(),
});

export const createPlaylistSchema = z.object({
    title: z.string().max(30),
    description: z.string().max(30),
});

export const updatePlaylistSchema = z.object({    
    title: z.string().max(30),
    description: z.string().max(30),
});