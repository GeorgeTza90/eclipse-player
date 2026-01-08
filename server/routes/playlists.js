const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const {
    getPlaylists, createPlaylist, updatePlaylist, deletePlaylist,
    getPlaylistSongs, addSongToPlaylist, moveSongInPlaylist, deleteSongFromPlaylist
} = require("../controllers/playlistController");
const { createRateLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.use(verifyToken);

// Rate limiters (soft limit)
const createPlaylistLimiter = createRateLimiter(1, 30);         // 30 / min
const deletePlaylistLimiter = createRateLimiter(1, 30);         // 30 / min

// Playlist CRUD
router.get("/", getPlaylists);
router.post("/", createPlaylistLimiter, createPlaylist);
router.put("/:id", updatePlaylist);
router.delete("/:id", deletePlaylistLimiter, deletePlaylist);

// Playlist Songs
router.get("/:playlistId/songs", getPlaylistSongs);
router.post("/:playlistId/songs", addSongToPlaylist);
router.put("/:playlistId/songs/:songId", moveSongInPlaylist);
router.delete("/:playlistId/songs/:songId", deleteSongFromPlaylist);

module.exports = router;
