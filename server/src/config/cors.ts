import cors from "cors";

const allowedOrigins =
  process.env.CLIENT_ORIGINS?.split(",").map(o => o.trim()) ?? [
    "http://localhost:5173",
    "https://eclipseplayer.netlify.app",
    "https://eclipseplayer.com",
  ];

export const corsMiddleware = cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error("CORS blocked"), false);
  },
  credentials: true,
});