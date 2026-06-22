import { AppError } from "../errors/AppError.js";
import { Artist } from "../types/artists.types.js";

export function ensureArtistExists(artist: Artist | null) {
    if (!artist) throw new AppError("ARTIST_NOT_FOUND", 404);
}