import express from "express";
import cors from "cors";
import songsRoutes from "./routes/songs";
import authRoutes from "./routes/auth";
import playlistRoutes from "./routes/playlists";
import artistsRoutes from "./routes/artists";

export const app = express();

/* -------------------- Core config -------------------- */
// Trust first proxy
app.set("trust proxy", 1);

// Body parser
app.use(express.json({ limit: "100kb" }));

// Cors
const allowedOrigins = process.env.CLIENT_ORIGINS
  ? process.env.CLIENT_ORIGINS.split(",")
  : [
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

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/songs", songsRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/artists", artistsRoutes);

// Health Check
app.get("/", (_req, res) => {
  res.json({ message: "Server is running!" });
});

// Error 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});
