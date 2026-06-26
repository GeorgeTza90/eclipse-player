import { Artist } from "../types/artists.types.js";
import { Ensure } from "../utils/ensure.js";

export function ensureArtistExists(artist: Artist | null) {
    Ensure.exists(artist, "ARTIST_NOT_FOUND", 404);
}