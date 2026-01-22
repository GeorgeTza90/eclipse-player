import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import songsRoutes from "./routes/songs";
import authRoutes from "./routes/auth";
import playlistRoutes from "./routes/playlists";
import artistsRoutes from "./routes/artists";
import { AppError } from "./types/ErrorTypes";

export const app = express();

/* -------------------- Core config -------------------- */
app.set("trust proxy", 1);
app.use(express.json({ limit: "100kb" }));

/* -------------------- CORS -------------------- */
const allowedOrigins = process.env.CLIENT_ORIGINS?.split(",") ?? [
  "http://localhost:5173",
  "https://eclipseplayer.netlify.app",
  "https://eclipseplayer.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

/* -------------------- Routes -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/songs", songsRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/artists", artistsRoutes);

/* -------------------- Health check -------------------- */
app.get("/", (_req, res) => {
  res.json({ message: "Server is running!" });
});

/* -------------------- 404 handler -------------------- */
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

/* -------------------- Error handler -------------------- */
app.use(
  (err: AppError, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(err.status ?? 500).json({
      error: err.message ?? "Internal Server Error",
    });
  }
);
