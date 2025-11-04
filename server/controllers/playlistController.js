const db = require("../db/db");

// --- Playlists CRUD ---
exports.getPlaylists = async (req, res) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    try {
        const [rows] = await db.query("SELECT * FROM playlists WHERE user_id = ?", [userId]);
        res.json(rows);
    } catch (err) {
        console.error("Error loading playlists:", err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.createPlaylist = async (req, res) => {
    const userId = req.user?.id;
    const { title, description } = req.body;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    if (!title) return res.status(400).json({ error: "Playlist title is required" });

    try {
        await db.query(
            "INSERT INTO playlists (user_id, title, description) VALUES (?, ?, ?)",
            [userId, title, description || ""]
        );
        res.status(201).json({ message: "Playlist created successfully" });
    } catch (err) {
        console.error("Error creating playlist:", err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.updatePlaylist = async (req, res) => {
    const userId = req.user?.id;
    const { id } = req.params;
    const { title, description } = req.body;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    try {
        const [result] = await db.query(
            "UPDATE playlists SET title = ?, description = ? WHERE id = ? AND user_id = ?",
            [title, description, id, userId]
        );
        if (result.affectedRows === 0)
            return res.status(404).json({ error: "Playlist not found or not authorized" });
        res.json({ message: "Playlist updated successfully" });
    } catch (err) {
        console.error("Error updating playlist:", err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.deletePlaylist = async (req, res) => {
  const userId = req.user?.id;
  const playlistId = Number(req.params.id); 
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const [result] = await db.query(
      "DELETE FROM playlists WHERE id = ? AND user_id = ?",
      [playlistId, userId]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Playlist not found or not authorized" });

    res.json({ message: "Playlist deleted successfully" });
  } catch (err) {
    console.error("Error deleting playlist:", err);
    res.status(500).json({ error: "Server error" });
  }
};


// --- Playlist Songs CRUD ---
exports.getPlaylistSongs = async (req, res) => {
    const userId = req.user?.id;
    const { playlistId } = req.params;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    try {
        const [playlist] = await db.query( "SELECT * FROM playlists WHERE id = ? AND user_id = ?", [playlistId, userId] );
        if (playlist.length === 0) return res.status(404).json({ error: "Playlist not found or not authorized" });

        const [rows] = await db.query(
            `SELECT s.* , ps.id AS playlistSongId, ps.order AS playlistOrder
             FROM playlist_songs ps
             JOIN songs s ON ps.song_id = s.id
             WHERE ps.playlist_id = ?
             ORDER BY ps.order ASC`,
            [playlistId]
        );

        res.json(rows);
    } catch (err) {
        console.error("Error loading playlist songs:", err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.addSongToPlaylist = async (req, res) => {
    const userId = req.user?.id;
    const { playlistId } = req.params;
    const { songId } = req.body;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    if (!songId) return res.status(400).json({ error: "Song ID is required" });

    try {
        const [playlist] = await db.query("SELECT id FROM playlists WHERE id = ? AND user_id = ?", [playlistId, userId]);
        if (playlist.length === 0) return res.status(404).json({ error: "Playlist not found or not authorized" });

        const [existing] = await db.query(
            "SELECT id FROM playlist_songs WHERE playlist_id = ? AND song_id = ?",
            [playlistId, songId]
        );
        if (existing.length > 0) return res.status(400).json({ error: "Song already in playlist" });

        const [lastOrder] = await db.query(
            "SELECT MAX(`order`) AS maxOrder FROM playlist_songs WHERE playlist_id = ?",
            [playlistId]
        );
        const order = (lastOrder[0].maxOrder || 0) + 1;

        await db.query(
            "INSERT INTO playlist_songs (playlist_id, song_id, `order`) VALUES (?, ?, ?)",
            [playlistId, songId, order]
        );

        res.status(201).json({ message: "Song added to playlist" });
    } catch (err) {
        console.error("Error adding song to playlist:", err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.moveSongInPlaylist = async (req, res) => {
    const userId = req.user?.id;
    const { playlistId, songId } = req.params;
    const { newOrder } = req.body;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    if (newOrder === undefined) return res.status(400).json({ error: "New order is required" });

    try {
        const [playlist] = await db.query("SELECT id FROM playlists WHERE id = ? AND user_id = ?", [playlistId, userId]);
        if (playlist.length === 0) return res.status(404).json({ error: "Playlist not found or not authorized" });

        const [songs] = await db.query(
            "SELECT id, `order` FROM playlist_songs WHERE playlist_id = ? ORDER BY `order` ASC",
            [playlistId]
        );
        const index = songs.findIndex(s => s.id === parseInt(songId));
        if (index === -1) return res.status(404).json({ error: "Song not found in playlist" });

        const [movedSong] = songs.splice(index, 1);
        const targetIndex = Math.max(0, Math.min(newOrder, songs.length));
        songs.splice(targetIndex, 0, movedSong);

        await Promise.all(
            songs.map((s, i) => db.query("UPDATE playlist_songs SET `order` = ? WHERE id = ?", [i, s.id]))
        );

        res.json({ message: "Song order updated" });
    } catch (err) {
        console.error("Error moving song in playlist:", err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.deleteSongFromPlaylist = async (req, res) => {
    const userId = req.user?.id;
    const { playlistId, songId } = req.params;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    try {
        const [playlist] = await db.query("SELECT id FROM playlists WHERE id = ? AND user_id = ?", [playlistId, userId]);
        if (playlist.length === 0) return res.status(404).json({ error: "Playlist not found or not authorized" });

        const [result] = await db.query("DELETE FROM playlist_songs WHERE playlist_id = ? AND song_id = ?", [playlistId, songId]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Song not found in playlist" });

        res.json({ message: "Song removed from playlist" });
    } catch (err) {
        console.error("Error deleting song from playlist:", err);
        res.status(500).json({ error: "Server error" });
    }
};