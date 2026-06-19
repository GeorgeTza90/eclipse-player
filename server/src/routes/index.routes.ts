import { Express } from "express";

import songsRoutes from "./songs.routes.js";
import authRoutes from "./auth.route.js";
import playlistRoutes from "./playlists.routes.js";
import artistsRoutes from "./artists.route.js";
import presetsRoutes from "./presets.routes.js";
import downloadRoutes from "./downloads.routes.js";

export function setupRoutes(app: Express) {
  app.use("/api/auth", authRoutes);
  app.use("/api/songs", songsRoutes);
  app.use("/api/playlists", playlistRoutes);
  app.use("/api/artists", artistsRoutes);
  app.use("/api/presets", presetsRoutes);
  app.use("/api/download", downloadRoutes);
}