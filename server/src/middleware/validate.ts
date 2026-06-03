import { z } from "zod";
import type { Request, RequestHandler, Response, NextFunction } from "express";

export const validateBody = <T extends z.ZodType>(schema: T) =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                error: "VALIDATION_ERROR",
                issues: result.error.issues.map((i) => ({
                    path: i.path,
                    message: i.message,
                })),
            });
        }

        req.body = result.data;
        next();
    };

export const validateParams = <T extends z.ZodType>(schema: T): RequestHandler =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.params);

        if (!result.success) {
            return res.status(400).json({
                error: "VALIDATION_ERROR",
                issues: result.error.issues.map((i) => ({
                    path: i.path,
                    message: i.message,
                })),
            });
        }

        req.params = result.data as any;
        next();
    };
  