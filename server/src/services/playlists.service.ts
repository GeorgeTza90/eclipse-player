import { pl } from "zod/locales";
import { AppError } from "../errors/AppError.js";
import { playlistsRepository } from "../repositories/playlists.repository.js";
import { Playlist, PlaylistSong } from "../types/controllers.types.js";

// -------------------- PRIVATE HELPERS --------------------
function ensurePlaylistExists(playlist: Playlist[]) {
    if (playlist.length === 0) throw new AppError("PLAYLIST_NOT_FOUND", 404);
}

function ensureSongExists(song: PlaylistSong[]) {
    if (song.length === 0) throw new AppError("SONG_NOT_FOUND_IN_PLAYLIST", 404);
}

function ensureSongNotExists(song: PlaylistSong[]) {
    if (song.length > 0) throw new AppError("SONG_ALREADY_IN_PLAYLIST", 400);
}

// -------------------- SERVICE --------------------
export const playlistsService = {
    // ---------------- PLAYLISTS CRUD ----------------
    async getPlaylists(userId: number) {
        return await playlistsRepository.findPlaylists(userId);        
    },    

    async createPlaylist(userId: number, title: string, description: string) {
        return await playlistsRepository.createPlaylist(userId, title, description);
    },

    async updatePlaylist(title: string, description: string, id: number, userId: number) {
        return await playlistsRepository.updatePlaylist(title, description, id, userId);        
    },

    async deletePlaylist(playlistId: number, userId: number) {
        return await playlistsRepository.deletePlaylist( playlistId, userId);
    },

        // ---------------- PLAYLISTS SONGS CRUD ----------------
    async getPlaylistSongs(playlistId: number, userId: number) {
        const playlist = await playlistsRepository.findPlaylist(playlistId, userId);
        ensurePlaylistExists(playlist);        

        const songs =  await playlistsRepository.findPlaylistSongs(playlistId);
        const songArtists = await playlistsRepository.findAllSongArtists();
        const artists = await playlistsRepository.findAllArtists();

        const artistMap = new Map(artists.map(a => [a.id, a]));        
        const songArtistMap = new Map<string, { name: string; role: string }[]>();

        for (const sa of songArtists) {
            const artist = artistMap.get(sa.artist_id);
            if (!artist) continue;

            const key = String(sa.song_id);
            if (!songArtistMap.has(key)) songArtistMap.set(key, []);

            songArtistMap.get(key)!.push({ name: artist.name, role: sa.role });
        }
        
        return songs.map(song => ({
            ...song,
            artists: songArtistMap.get(String(song.id)) || []
        }));
    },

    async addSongInPlaylist(playlistId: number, songId: number, userId: number) {
        const playlist = await playlistsRepository.findPlaylist(playlistId, userId);
        ensurePlaylistExists(playlist);

        const existingSong = await playlistsRepository.findPlaylistSong(playlistId, songId);
        ensureSongNotExists(existingSong);

        const lastOrder = await playlistsRepository.findMaxOrder(playlistId);
        const order = (lastOrder?.[0]?.maxOrder ?? 0) + 1;

        return await playlistsRepository.createSongInPlaylist(playlistId, songId, order);
    },

    async moveSongInPlaylist(playlistId: number, songId: number, newOrder: number, userId: number) {
        const playlist = await playlistsRepository.findPlaylist(playlistId, userId);
        ensurePlaylistExists(playlist);

        const songs = await playlistsRepository.findPlaylistSongsInOrder(playlistId);
        const index = songs.findIndex(s => s.id === songId);
        if (index === -1) throw new AppError("SONG_NOT_FOUND_IN_PLAYLIST", 404);

        const [movedSong] = songs.splice(index, 1);
        const targetIndex = Math.max(0, Math.min(newOrder, songs.length))
        songs.splice(targetIndex, 0, movedSong);

        return await playlistsRepository.updateSongInPlaylist(songs);
    },

    async deleteSongInPlaylist(playlistId: number, songId: number, userId: number) {
        const playlist = await playlistsRepository.findPlaylist(playlistId, userId);
        ensurePlaylistExists(playlist);
        
        const existingSong = await playlistsRepository.findPlaylistSong(playlistId, songId);
        ensureSongExists(existingSong);
        
        return await playlistsRepository.deleteSongInPlaylist(playlistId, songId);
    },
    
}