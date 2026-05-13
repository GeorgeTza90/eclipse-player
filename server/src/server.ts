import "dotenv/config";
import { app } from "./app.js";
import { logger } from "./utils/logger.js";

const PORT = Number(process.env.PORT ?? 3000);
if (Number.isNaN(PORT)) throw new Error("Invalid Port");

app.listen(PORT, () => logger.info("Server running", { port: PORT, env: process.env.NODE_ENV }));