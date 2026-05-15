import { playlistsRepository } from "../repositories/playlistsRepository.js";
import { PlaylistSong } from "../types/controllersTypes.js";

export const playlistsService = {
    // PLAYLISTS CRUD  
    async getPlaylists(userId: number) {
        return await playlistsRepository.getPlaylists(userId);        
    },    

    async createPlaylist(userId: number, title: string, description: string) {
        return await playlistsRepository.createPlaylist(userId, title, description);
    },

    async updatePlaylist(title: string, description: string, id: number, userId: number) {
        return await playlistsRepository.updatePlaylist(title, description, id, userId);        
    },

    async deletePlaylist( playlistId: number, userId: number) {
        return await playlistsRepository.deletePlaylist( playlistId, userId);
    },

    // PLAYLISTS SONGS CRUD
    async getPlaylistSongs(playlistId: number) {
        return await playlistsRepository.getPlaylistSongs(playlistId);
    },

    async addSongInPlaylist(playlistId: number, songId: number, order:number) {
        return await playlistsRepository.addSongInPlaylist(playlistId, songId, order);
    },

    async moveSongInPlaylist(songs: PlaylistSong[]) {
        return await playlistsRepository.moveSongInPlaylist(songs);
    },

    async deleteSongInPlaylist(playlistId: number, songId: number) {
        return await playlistsRepository.deleteSongInPlaylist(playlistId, songId);
    },

    // HELPERS
    async getPlaylist(playlistId: number, userId: number) {
        return await playlistsRepository.getPlaylist(playlistId, userId);        
    },

    async getPlaylistSong(playlistId: number, songId: number) {
        return await playlistsRepository.getPlaylistSong(playlistId, songId);
    },

    async getPlaylistSongsInOrder(playlistId: number) {
        return await playlistsRepository.getPlaylistSongsInOrder(playlistId);
    },

    async selectMaxOrder(playlistId: number) {
        return await playlistsRepository.selectMaxOrder(playlistId);
    },
}