import cors from "cors";
import { AppError } from "../errors/AppError.js";
import { CLIENT_ORIGINS } from "./env.js";

const allowedOrigins =
    CLIENT_ORIGINS?.split(",").map(o => o.trim()) ?? [
        "http://localhost:5173",
        "https://eclipseplayer.netlify.app",
        "https://eclipseplayer.com",
    ];

export const corsMiddleware = cors({
    origin: (origin, cb) => {
        if (!origin) return cb(null, true);
        if (allowedOrigins.includes(origin)) return cb(null, true);
        return cb(new AppError("CORS blocked", 403), false);
    },
    credentials: true,
});