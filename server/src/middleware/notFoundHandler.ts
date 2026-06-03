import { Request, Response } from "express";
import { logger } from "../utils/logger.js";

export const notFoundHandler = (req: Request, res: Response) => {
    res.status(404).json({
        error: "Route not found",
        path: req.originalUrl
    });
    logger.error("Route not found");
};