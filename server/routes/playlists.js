const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const {
    getPlaylists, createPlaylist, updatePlaylist, deletePlaylist,
    getPlaylistSongs, addSongToPlaylist, moveSongInPlaylist, deleteSongFromPlaylist
} = require("../controllers/playlistController");

const router = express.Router();

router.use(verifyToken);

// Playlist CRUD
router.get("/", getPlaylists);
router.post("/", createPlaylist);
router.put("/:id", updatePlaylist);
router.delete("/:id", deletePlaylist);

// Playlist Songs
router.get("/:playlistId/songs", getPlaylistSongs);
router.post("/:playlistId/songs", addSongToPlaylist);
router.put("/:playlistId/songs/:songId", moveSongInPlaylist);
router.delete("/:playlistId/songs/:songId", deleteSongFromPlaylist);

module.exports = router;
