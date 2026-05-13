import { Express } from "express";

import songsRoutes from "./songs.js";
import authRoutes from "./auth.js";
import playlistRoutes from "./playlists.js";
import artistsRoutes from "./artists.js";
import presetsRoutes from "./presets.js";
import downloadRoutes from "./download.js";

export function setupRoutes(app: Express) {
  app.use("/api/auth", authRoutes);
  app.use("/api/songs", songsRoutes);
  app.use("/api/playlists", playlistRoutes);
  app.use("/api/artists", artistsRoutes);
  app.use("/api/presets", presetsRoutes);
  app.use("/api/download", downloadRoutes);
}