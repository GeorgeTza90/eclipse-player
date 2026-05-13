import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { logger } from "../utils/logger.js";

dotenv.config();

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQL_PORT) || 3306,
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
