import express from "express";
import { setupSecurity } from "./config/security.js";
import { corsMiddleware } from "./config/cors.js";
import { setupRoutes } from "./routes/index.routes.js";
import { setupParsers } from "./middleware/parsers.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";

export const app = express();

/* -------------------- Security Layer -------------------- */
setupSecurity(app);

/* -------------------- CORS -------------------- */
app.use(corsMiddleware);

/* -------------------- Parser -------------------- */
setupParsers(app);

/* -------------------- Health check -------------------- */
app.get("/health", (_req, res) => res.json({ message: "Server is running!" }));

/* -------------------- Routes -------------------- */
setupRoutes(app);

/* -------------------- Error 404 -------------------- */
app.use(notFoundHandler);

/* -------------------- Error Handler -------------------- */
app.use(errorHandler);

