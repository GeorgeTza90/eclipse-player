import { Express } from "express";
import express from "express";
import cookieParser from "cookie-parser";

export function setupParsers(app: Express) {
  app.use(cookieParser());

  app.use(express.json({ limit: "100kb" }));
  app.use(express.urlencoded({ extended: true, limit: "100kb" }));
}