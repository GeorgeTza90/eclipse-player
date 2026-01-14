import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import songsRoutes from "./src/routes/songs";
import authRoutes from "./src/routes/auth";
import playlistRoutes from "./src/routes/playlists";
import artistsRoutes from "./src/routes/artists";

dotenv.config();
const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

// Middleware
app.set("trust proxy", 1);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://eclipseplayer.netlify.app",
      "https://eclipseplayer.com",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "100kb" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/songs", songsRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/artists", artistsRoutes);

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Server is running!" });
});

// Unknown API routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});