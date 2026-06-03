import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { logger } from "../utils/logger.js";

if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET missing");
const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    let token: string | undefined;

    if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    } else if (req.cookies?.token) {
        token = req.cookies.token;
    }

    if (!token) {
        res.status(401).json({ error: "Unauthorized - Missing token" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
        (req as any).user = { id: decoded.id };
        next();
    } catch (err: any) {
        logger.warn("JWT verification failed:", err);
        res.status(401).json({ error: "Invalid token" });
    }
};