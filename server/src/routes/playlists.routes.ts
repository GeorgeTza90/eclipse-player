import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createRateLimiter }  from '../middleware/rateLimiter.js';
import { validateBody, validateParams } from "../middleware/validate.js";
import { createPlaylistSchema, getAllIdsSchema, newOrderSchema, playlistIdSchema, songIdSchema, updatePlaylistSchema } from "../schemas/playlists.schema.js";
import {
    getPlaylists, createPlaylist, updatePlaylist, deletePlaylist,
    getPlaylistSongs, addSongToPlaylist, moveSongInPlaylist, deleteSongFromPlaylist
} from "../controllers/playlist.controller.js";

const router = Router();

// Rate limiters (min/max)
const createPlaylistLimiter = createRateLimiter(1, 30);
const deletePlaylistLimiter = createRateLimiter(1, 30);

router.use(verifyToken);

// Playlist CRUD
router.get("/", getPlaylists);
router.post("/", createPlaylistLimiter, validateBody(createPlaylistSchema), createPlaylist);
router.put("/:id", validateParams(playlistIdSchema), validateBody(updatePlaylistSchema), updatePlaylist);
router.delete("/:id", deletePlaylistLimiter, validateParams(playlistIdSchema), deletePlaylist);

// Playlist Songs
router.get("/:id/songs", validateParams(playlistIdSchema), getPlaylistSongs);
router.post("/:id/songs", validateParams(playlistIdSchema), validateBody(songIdSchema), addSongToPlaylist);
router.put("/:id/songs/:songId", validateParams(getAllIdsSchema), validateBody(newOrderSchema), moveSongInPlaylist);
router.delete("/:id/songs/:songId", validateParams(getAllIdsSchema), deleteSongFromPlaylist);

export default router;