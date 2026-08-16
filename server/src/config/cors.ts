import cors from "cors";
import { AppError } from "../errors/AppError.js";
import { CLIENT_ORIGINS } from "./env.js";

const allowedOrigins = CLIENT_ORIGINS.split(",").map(o => o.trim());

export const corsMiddleware = cors({
    origin: (origin, cb) => {
        if (!origin) return cb(null, true);
        if (allowedOrigins.includes(origin)) return cb(null, true);
        return cb(new AppError("CORS_BLOCKED", 403), false);
    },
    credentials: true,
});