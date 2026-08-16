import { Request, Response, NextFunction } from "express";

type AsyncRouteHandler<T extends Request = Request> = (
    req: T,
    res: Response,
    next: NextFunction
) => Promise<any>;

export const asyncHandler = <T extends Request = Request>(fn: AsyncRouteHandler<T>) =>
    (req: T, res: Response, next: NextFunction) =>
        Promise.resolve(fn(req, res, next)).catch(next);