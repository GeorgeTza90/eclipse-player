import { Request, Response, NextFunction } from "express";
import { errorMap } from "../utils/httpErrorMap.js";
import { AppError } from "../errors/AppError.js";
import { logger } from "../utils/logger.js";


export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
        const mapped = errorMap[err.message];
        if (mapped) {
            return res.status(mapped.status).json({ error: mapped.message });
        }
        return res.status(err.statusCode).json({ error: err.message });
    }

    if (err.type === "entity.parse.failed" || err instanceof SyntaxError) {
        return res.status(400).json({ error: "Invalid JSON in request body" });
    }

    logger.error(err);
    return res.status(500).json({ error: "Internal server error" });
};