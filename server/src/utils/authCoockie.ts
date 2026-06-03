import { Response } from "express";

const isProd = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? ("none" as const) : ("lax" as const),
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export function setAuthCookie(res: Response, token: string) {
  res.cookie("token", token, cookieOptions);
}

export function clearAuthCookie(res: Response) {
  res.clearCookie("token", cookieOptions);
}