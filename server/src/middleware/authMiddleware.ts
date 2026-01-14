import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequestMidl } from "../types/controllersTypes";

const JWT_SECRET = process.env.JWT_SECRET || "#$%^$!#JWT";

export const verifyToken = (req: AuthenticatedRequestMidl, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized - Missing token" });
    return;
  }
  
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err: any) {
    console.error("JWT verification failed:", err);
    res.status(401).json({ error: "Invalid token" });
  }
};
