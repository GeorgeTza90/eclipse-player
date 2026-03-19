import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequestMidl } from "../types/controllersTypes";

const JWT_SECRET = process.env.JWT_SECRET || "#$%^$!#JWT";

export const verifyToken = (req: AuthenticatedRequestMidl, res: Response, next: NextFunction): void => {  
  const authHeader = req.headers.authorization;
  let token;

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
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err: any) {
    console.error("JWT verification failed:", err);
    res.status(401).json({ error: "Invalid token" });
  }
};
