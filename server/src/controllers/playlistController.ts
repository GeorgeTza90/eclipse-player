import { Response } from "express";
import { AuthenticatedRequest} from "../types/controllersTypes.js";
import { playlistsService } from "../services/playlistsService.js";

// -----------------------------
// PLAYLISTS CRUD
// -----------------------------
export const getPlaylists = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

    try {        
        const playlists = await playlistsService.getPlaylists(userId);
        res.json(playlists);
    } catch (error) {        
        res.status(500).json({ error: "Server error" });
    }
};

export const createPlaylist = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const { title, description } = req.body as { title?: string; description: string };
    if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }
    if (!title) { res.status(400).json({ error: "Playlist title is required" }); return; }

    try {
        await playlistsService.createPlaylist(userId, title, description);
        res.status(201).json({ message: "Playlist created successfully" });
    } catch (error) {        
        res.status(500).json({ error: "Server error" });
    }
};

export const updatePlaylist = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

    const playlistId = Number(req.params.id);    
    if (isNaN(playlistId)) { res.status(400).json({ error: "Invalid Playlist Id" }); return; }

    const { title, description } = req.body as { title?: string; description?: string };   
    if (!title || !description) { res.status(400).json({ error: "Title or Description Missing" }); return; }      

    try {
        const result = await playlistsService.updatePlaylist(title, description, playlistId, userId)
        if (result.affectedRows === 0) {res.status(404).json({ error: "Playlist not found or not authorized" }); return; }
        res.json({ message: "Playlist updated successfully" });
    } catch (error) {        
        res.status(500).json({ error: "Server error" });
    }
};

export const deletePlaylist = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

    const playlistId = Number(req.params.id);
    if (isNaN(playlistId)) { res.status(400).json({ error: "Invalid Playlist Id" }); return; }    

    try {
        const result = await playlistsService.deletePlaylist(playlistId, userId)
        if (result.affectedRows === 0) { res.status(404).json({ error: "Playlist not found or not authorized" }); return; }
        res.json({ message: "Playlist deleted successfully" });
    } catch (error) {        
        res.status(500).json({ error: "Server error" });
    }
};

// -----------------------------
// Playlist Songs CRUD
// -----------------------------
export const getPlaylistSongs = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

    const playlistId = Number(req.params.playlistId);
    if (isNaN(playlistId)) { res.status(400).json({ error: "Invalid Playlist Id" }); return; }        

    try {
        const playlistSongs = await playlistsService.getPlaylist(playlistId, userId);
        if (playlistSongs.length === 0) { res.status(404).json({ error: "Playlist not found or not authorized" }); return; }

        const rows = await playlistsService.getPlaylistSongs(playlistId);        
        res.json(rows);
    } catch (error) {        
        res.status(500).json({ error: "Server error" });
    }
};

// -----------------------------
// ADD SONG TO PLAYLISTS
// -----------------------------
export const addSongToPlaylist = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const playlistId = Number(req.params.playlistId);
    const { songId } = req.body as { songId?: number };

    if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }
    if (!songId) { res.status(400).json({ error: "Song ID is required" }); return; }

    try {        
        const playlist = await playlistsService.getPlaylist(playlistId, userId);
        if (playlist.length === 0) { res.status(404).json({ error: "Playlist not found or not authorized" }); return; }

        const existing = await playlistsService.getPlaylistSong(playlistId, songId)
        if (existing.length > 0) { res.status(400).json({ error: "Song already in playlist" }); return; }

        const lastOrder = await playlistsService.selectMaxOrder(playlistId);
        const order = (lastOrder[0].maxOrder as number || 0) + 1;
        await playlistsService.addSongInPlaylist(playlistId, songId, order);
        res.status(201).json({ message: "Song added to playlist" });
    } catch (error) {        
        res.status(500).json({ error: "Server error" });
    }
};

// -----------------------------
// MOVE SONG IN PLAYLISTS
// -----------------------------
export const moveSongInPlaylist = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

    const playlistId = Number(req.params.playlistId);
    const songId = Number(req.params.songId);
    const { newOrder } = req.body as { newOrder?: number };    
    if (newOrder === undefined) { res.status(400).json({ error: "New order is required" }); return; }

    try {
        const playlist = await playlistsService.getPlaylist(playlistId, userId)
        if (playlist.length === 0) { res.status(404).json({ error: "Playlist not found or not authorized" }); return; }

        const songs = await playlistsService.getPlaylistSongsInOrder(playlistId);
        const index = songs.findIndex(s => s.id === songId);
        if (index === -1) { res.status(404).json({ error: "Song not found in playlist" }); return; }

        const [movedSong] = songs.splice(index, 1);
        const targetIndex = Math.max(0, Math.min(newOrder, songs.length));
        songs.splice(targetIndex, 0, movedSong);

        await playlistsService.moveSongInPlaylist(songs);

        res.json({ message: "Song order updated" });
    } catch (error) {        
        res.status(500).json({ error: "Server error" });
    }
};

// -----------------------------
// DELETE SONG FROM PLAYLISTS
// -----------------------------
export const deleteSongFromPlaylist = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const playlistId = Number(req.params.playlistId);
    const songId = Number(req.params.songId);

    if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }

    try {
        const [playlist] = await playlistsService.getPlaylist(playlistId, userId);
        if (!playlist) { res.status(404).json({ error: "Playlist not found or not authorized" }); return; }

        const result = await playlistsService.deleteSongInPlaylist(playlistId, songId);        
        if (result.affectedRows === 0) { res.status(404).json({ error: "Song not found in playlist" }); return; }
        
        res.json({ message: "Song removed from playlist" });
    } catch (error) {        
        res.status(500).json({ error: "Server error" });
    }
};