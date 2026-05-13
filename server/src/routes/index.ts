import { Express } from "express";

import songsRoutes from "./songs";
import authRoutes from "./auth";
import playlistRoutes from "./playlists";
import artistsRoutes from "./artists";
import presetsRoutes from "./presets";
import downloadRoutes from "./download";

export function setupRoutes(app: Express) {
  app.use("/api/auth", authRoutes);
  app.use("/api/songs", songsRoutes);
  app.use("/api/playlists", playlistRoutes);
  app.use("/api/artists", artistsRoutes);
  app.use("/api/presets", presetsRoutes);
  app.use("/api/download", downloadRoutes);
}