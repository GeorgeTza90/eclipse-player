import "dotenv/config";
import { app } from "./app.js";
import { logger } from "./utils/logger.js";

const PORT = Number(process.env.PORT ?? 3000);
if (Number.isNaN(PORT)) throw new Error("Invalid Port");

const server = app.listen(PORT, () => 
    logger.info("Server running", { port: PORT, env: process.env.NODE_ENV })
);

server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
        logger.error(`Port ${PORT} is already in use`, { port: PORT});
    } else {
        logger.error("Server failed to start", { error: err.message });
    }
    process.exit(1);
});