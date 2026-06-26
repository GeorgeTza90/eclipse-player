import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export function signToken(userId: number): string {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
}