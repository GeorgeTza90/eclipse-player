import { Express } from "express";
import helmet from "helmet";

export function setupSecurity(app: Express) {
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  app.set("trust proxy", 1);
  app.disable("x-powered-by");
}