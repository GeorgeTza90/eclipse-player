import { Request, Response } from "express";
import db from "../db/db";
import { RowDataPacket, ResultSetHeader} from "mysql2";
import { Playlist, PlaylistSong, AuthenticatedRequest} from "../types/controllersTypes";

// -----------------------------
// Playlists CRUD
// -----------------------------
export const getPlaylists = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const [rows] = await db.query<Playlist[]>(
      "SELECT * FROM playlists WHERE user_id = ?",
      [userId]
    );
    
    res.json(rows);
  } catch (error) {
    console.error("Error loading playlists:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const createPlaylist = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  const { title, description } = req.body as { title?: string; description?: string };

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  if (!title) {
    res.status(400).json({ error: "Playlist title is required" });
    return;
  }

  try {
    await db.query<ResultSetHeader>(
      "INSERT INTO playlists (user_id, title, description) VALUES (?, ?, ?)",
      [userId, title, description || ""]
    );

    res.status(201).json({ message: "Playlist created successfully" });
  } catch (error) {
    console.error("Error creating playlist:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updatePlaylist = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  const { id } = req.params;
  const { title, description } = req.body as { title?: string; description?: string };

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const [result] = await db.query<ResultSetHeader>(
      "UPDATE playlists SET title = ?, description = ? WHERE id = ? AND user_id = ?",
      [title, description, id, userId]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Playlist not found or not authorized" });
      return;
    }

    res.json({ message: "Playlist updated successfully" });
  } catch (error) {
    console.error("Error updating playlist:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deletePlaylist = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  const playlistId = Number(req.params.id);

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const [result] = await db.query<ResultSetHeader>(
      "DELETE FROM playlists WHERE id = ? AND user_id = ?",
      [playlistId, userId]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Playlist not found or not authorized" });
      return;
    }

    res.json({ message: "Playlist deleted successfully" });
  } catch (error) {
    console.error("Error deleting playlist:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// -----------------------------
// Playlist Songs CRUD
// -----------------------------
export const getPlaylistSongs = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  const playlistId = Number(req.params.playlistId);

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const [playlist] = await db.query<Playlist[]>(
      "SELECT * FROM playlists WHERE id = ? AND user_id = ?",
      [playlistId, userId]
    );
    if (playlist.length === 0) {
      res.status(404).json({ error: "Playlist not found or not authorized" });
      return;
    }

    const [rows] = await db.query<PlaylistSong[]>(
      `SELECT s.*, ps.id AS playlistSongId, ps.order AS playlistOrder
       FROM playlist_songs ps
       JOIN songs s ON ps.song_id = s.id
       WHERE ps.playlist_id = ?
       ORDER BY ps.order ASC`,
      [playlistId]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error loading playlist songs:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const addSongToPlaylist = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  const playlistId = Number(req.params.playlistId);
  const { songId } = req.body as { songId?: number };

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  if (!songId) {
    res.status(400).json({ error: "Song ID is required" });
    return;
  }

  try {
    const [playlist] = await db.query<Playlist[]>(
      "SELECT id FROM playlists WHERE id = ? AND user_id = ?",
      [playlistId, userId]
    );
    if (playlist.length === 0) {
      res.status(404).json({ error: "Playlist not found or not authorized" });
      return;
    }

    const [existing] = await db.query<PlaylistSong[]>(
      "SELECT id FROM playlist_songs WHERE playlist_id = ? AND song_id = ?",
      [playlistId, songId]
    );
    if (existing.length > 0) {
      res.status(400).json({ error: "Song already in playlist" });
      return;
    }

    const [lastOrder] = await db.query<RowDataPacket[]>(
      "SELECT MAX(`order`) AS maxOrder FROM playlist_songs WHERE playlist_id = ?",
      [playlistId]
    );

    const order = (lastOrder[0].maxOrder as number || 0) + 1;

    await db.query<ResultSetHeader>(
      "INSERT INTO playlist_songs (playlist_id, song_id, `order`) VALUES (?, ?, ?)",
      [playlistId, songId, order]
    );

    res.status(201).json({ message: "Song added to playlist" });
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const moveSongInPlaylist = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  const playlistId = Number(req.params.playlistId);
  const songId = Number(req.params.songId);
  const { newOrder } = req.body as { newOrder?: number };

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  if (newOrder === undefined) {
    res.status(400).json({ error: "New order is required" });
    return;
  }

  try {
    const [playlist] = await db.query<Playlist[]>(
      "SELECT id FROM playlists WHERE id = ? AND user_id = ?",
      [playlistId, userId]
    );
    if (playlist.length === 0) {
      res.status(404).json({ error: "Playlist not found or not authorized" });
      return;
    }

    const [songs] = await db.query<PlaylistSong[]>(
      "SELECT id, `order` FROM playlist_songs WHERE playlist_id = ? ORDER BY `order` ASC",
      [playlistId]
    );

    const index = songs.findIndex(s => s.id === songId);
    if (index === -1) {
      res.status(404).json({ error: "Song not found in playlist" });
      return;
    }

    const [movedSong] = songs.splice(index, 1);
    const targetIndex = Math.max(0, Math.min(newOrder, songs.length));
    songs.splice(targetIndex, 0, movedSong);

    await Promise.all(
      songs.map((s, i) =>
        db.query<ResultSetHeader>("UPDATE playlist_songs SET `order` = ? WHERE id = ?", [i, s.id])
      )
    );

    res.json({ message: "Song order updated" });
  } catch (error) {
    console.error("Error moving song in playlist:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteSongFromPlaylist = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  const playlistId = Number(req.params.playlistId);
  const songId = Number(req.params.songId);

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const [playlist] = await db.query<Playlist[]>(
      "SELECT id FROM playlists WHERE id = ? AND user_id = ?",
      [playlistId, userId]
    );
    if (playlist.length === 0) {
      res.status(404).json({ error: "Playlist not found or not authorized" });
      return;
    }

    const [result] = await db.query<ResultSetHeader>(
      "DELETE FROM playlist_songs WHERE playlist_id = ? AND song_id = ?",
      [playlistId, songId]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Song not found in playlist" });
      return;
    }

    res.json({ message: "Song removed from playlist" });
  } catch (error) {
    console.error("Error deleting song from playlist:", error);
    res.status(500).json({ error: "Server error" });
  }
};
