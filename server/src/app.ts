import express, { Request, Response, NextFunction } from "express";
import { setupSecurity } from "./config/security.js";
import { logger } from "./utils/logger.js";
import { corsMiddleware } from "./config/cors.js";
import { setupParsers } from "./middleware/parsers.js";
import { setupRoutes } from "./routes/index.js";

export const app = express();

/* -------------------- Security Layer -------------------- */
setupSecurity(app);

/* -------------------- CORS -------------------- */
app.use(corsMiddleware);

/* -------------------- Parser -------------------- */
setupParsers(app);

/* -------------------- Routes -------------------- */
setupRoutes(app);

/* -------------------- Health check -------------------- */
app.get("/health", (_req, res) => res.json({ message: "Server is running!" }));

/* -------------------- Error 404 -------------------- */
app.use((_req, res) => {
    logger.error("Route not found", {method: _req.method, url: _req.originalUrl,});
    res.status(404).json({ error: "Route not found" });
});

/* -------------------- Error handler -------------------- */
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status ?? 500;
    const message = status === 500 ? "Internal Server Error" : err.message;
    logger.error("API Error", {message, stack: err.stack, status});
    res.status(status).json({error: message});
});

