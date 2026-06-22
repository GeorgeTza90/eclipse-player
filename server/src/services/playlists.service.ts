import { playlistsRepository } from "../repositories/playlists.repository.js";
import { 
    ensurePlaylistExists, ensurePlaylistUpdated, ensureSongExists,
    ensureSongIndexExists, ensureSongNotExists, ensureValidOrder 
} from "../guards/playlists.guard.js";

// -------------------- SERVICE --------------------
export const playlistsService = {
    // ---------------- PLAYLISTS CRUD ----------------
    async getPlaylists(userId: number) {
        return playlistsRepository.findPlaylists(userId);        
    },    

    async createPlaylist(userId: number, title: string, description: string) {
        return playlistsRepository.createPlaylist(userId, title, description);
    },

    async updatePlaylist(title: string, description: string, id: number, userId: number) {
        const result = await playlistsRepository.updatePlaylist(title, description, id, userId);
        ensurePlaylistUpdated(result);
        return result;
    },

    async deletePlaylist(playlistId: number, userId: number) {
        const result = await playlistsRepository.deletePlaylist(playlistId, userId);
        ensurePlaylistUpdated(result);        
        return result;
    },

    // ---------------- PLAYLISTS SONGS CRUD ----------------
    async getPlaylistSongs(playlistId: number, userId: number) {        
        const playlist = await playlistsRepository.findPlaylist(playlistId, userId);
        ensurePlaylistExists(playlist);        

        const songs =  await playlistsRepository.findPlaylistSongs(playlistId);
        const songIds = songs.map(s => s.id)

        const songArtists = await playlistsRepository.findSongArtistsForSongs(songIds);
        const artistsIds = [...new Set(songArtists.map(sa => Number(sa.artist_id)))];
        const artists = await playlistsRepository.findArtistsByIds(artistsIds);
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
        const playlistOrder = (lastOrder?.[0]?.maxOrder ?? 0) + 1;

        return playlistsRepository.createSongInPlaylist(playlistId, songId, playlistOrder);
    },

    async moveSongInPlaylist(playlistId: number, songId: number, newOrder: number, userId: number) {
        const playlist = await playlistsRepository.findPlaylist(playlistId, userId);
        ensurePlaylistExists(playlist);

        const songs = await playlistsRepository.findPlaylistSongsInOrder(playlistId);
        ensureValidOrder(newOrder, songs.length);

        const index = songs.findIndex(s => s.id === songId);
        ensureSongIndexExists(index);

        const [movedSong] = songs.splice(index, 1);        
        songs.splice(newOrder, 0, movedSong);

        return playlistsRepository.updateSongInPlaylist(songs);
    },

    async deleteSongInPlaylist(playlistId: number, songId: number, userId: number) {
        const playlist = await playlistsRepository.findPlaylist(playlistId, userId);
        ensurePlaylistExists(playlist);
        
        const existingSong = await playlistsRepository.findPlaylistSong(playlistId, songId);
        ensureSongExists(existingSong);
        
        return playlistsRepository.deleteSongInPlaylist(playlistId, songId);
    },
    
}