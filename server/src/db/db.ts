import mysql from "mysql2/promise";
import { logger } from "../utils/logger.js";
import { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT } from "../config/env.js";

const db = mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    port: MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Test connection
(async () => {
    try {
        const conn = await db.getConnection();
        logger.info("Connected to Database");
        conn.release();
    } catch (error) {
        logger.error("Database connection failed:", { error });
    }
})();

export default db;