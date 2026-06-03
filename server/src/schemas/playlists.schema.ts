import { z } from "zod";

export const playlistIdSchema = z.object({
    id: z.string(),
});

export const songIdSchema = z.object({
    songId: z.number(),
});

export const getAllIdsSchema = z.object({    
    id: z.string(),
    songId: z.string(),
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