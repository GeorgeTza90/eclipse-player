import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { logger } from "../utils/logger.js";
import { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT } from "../config/env.js";

dotenv.config();

const db = mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    port: Number(MYSQL_PORT) || 3306,
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
        logger.error("Database connection failed:", {error});
    }
})();

export default db;
