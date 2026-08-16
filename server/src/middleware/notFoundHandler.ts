import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
    next(new AppError("NOT_FOUND", 404, { path: req.originalUrl }));
};