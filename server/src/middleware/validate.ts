import { z } from "zod";
import type { Request, RequestHandler, NextFunction } from "express";
import { AppError } from "@/errors/AppError.js";

const validate = <T extends z.ZodType>(
    schema: T,
    source: "body" | "params"
): RequestHandler =>
    (req: Request, _res, next: NextFunction) => {
        const result = schema.safeParse(req[source]);

        if (!result.success) {
            return next(new AppError("VALIDATION_ERROR", 400, {
                issues: result.error.issues.map((i) => ({
                    path: i.path,
                    message: i.message,
                })),
            }));
        }

        req[source] = result.data as any;
        next();
    };

export const validateBody = <T extends z.ZodType>(schema: T) => validate(schema, "body");
export const validateParams = <T extends z.ZodType>(schema: T) => validate(schema, "params");