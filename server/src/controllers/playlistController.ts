import { Response } from "express";
import { AuthenticatedRequest} from "../types/controllersTypes.js";
import { playlistsService } from "../services/playlistsService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// -----------------------------
// PLAYLISTS CRUD
// -----------------------------
export const getPlaylists = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user.id;    
    const playlists = await playlistsService.getPlaylists(userId);
    res.json(playlists);    
});

export const createPlaylist = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user.id;
    const { title, description } = req.body;          
    await playlistsService.createPlaylist(userId, title, description);
    res.status(201).json({ message: "Playlist created successfully" });    
});

export const updatePlaylist = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user.id;
    const playlistId = Number(req.params.id);
    const { title, description } = req.body;    
    await playlistsService.updatePlaylist(title, description, playlistId, userId)    
    res.json({ message: "Playlist updated successfully" });    
});

export const deletePlaylist = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {    
    const userId = req.user.id;  
    const playlistId = Number(req.params.id);   
    await playlistsService.deletePlaylist(playlistId, userId)    
    res.json({ message: "Playlist deleted successfully" });
   
});

// -----------------------------
// Playlist Songs CRUD
// -----------------------------
export const getPlaylistSongs = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user.id;    
    const playlistId = Number(req.params.id);
    const rows = await playlistsService.getPlaylistSongs(playlistId, userId);        
    res.json(rows);    
});

// -----------------------------
// ADD SONG TO PLAYLISTS
// -----------------------------
export const addSongToPlaylist = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    console.log("Reached");
    const userId = req.user.id;
    const playlistId = Number(req.params.id);
    const { songId } = req.body;        
    await playlistsService.addSongInPlaylist(playlistId, songId, userId);
    res.status(201).json({ message: "Song added to playlist" });    
});

// -----------------------------
// MOVE SONG IN PLAYLISTS
// -----------------------------
export const moveSongInPlaylist = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user.id;   
    const playlistId = Number(req.params.id);
    const songId = Number(req.params.songId);
    const { newOrder } = req.body;
    await playlistsService.moveSongInPlaylist(playlistId, songId, newOrder, userId);
    res.json({ message: "Song order updated" });
});

// -----------------------------
// DELETE SONG FROM PLAYLISTS
// -----------------------------
export const deleteSongFromPlaylist = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user.id;
    const playlistId = Number(req.params.id);
    const songId = Number(req.params.songId);            
    await playlistsService.deleteSongInPlaylist(playlistId, songId, userId);    
    res.json({ message: "Song removed from playlist" });
});