import db from "../db/db.js";
import { RowDataPacket, ResultSetHeader} from "mysql2";
import { PasswordResetTypes, Playlist, PlaylistSong, Song, User } from "../types/controllersTypes.js";

export const authRepository = {
    // GET USER DATA
    async getUserbyID(userId: number): Promise<User[]> {
        const [user] = await db.query<User[]>("SELECT id, username, email, premium, private FROM users WHERE id = ?", [userId]);
        return user;
    },

    async getUserbyEmail(email: string): Promise<User[]> {
        const [user] = await db.query<User[]>("SELECT id, username, email, password, premium, private FROM users WHERE email = ?", [email]);
        return user;
    },

    async getUserbyEmailNoPassword(email: string): Promise<User[]> {
        const [user] = await db.query<User[]>("SELECT id, username, email, premium, private FROM users WHERE email = ?", [email]);
        return user;
    },

    async getUserPassword(userId: number): Promise<User[]> {
        const [userPass] = await db.query<User[]>("SELECT password FROM users WHERE id = ?", [userId] );
        return userPass;
    },

    async getUserPremium(userId: number): Promise<User[]> {
        const [user] = await db.query<User[]>("SELECT premium, private FROM users WHERE id = ?", [userId]);
        return user;
    },
    
    // UPDATE USER DATA
    async updateUserPassword(newPassword: string, userId: number): Promise<void> {
        await db.query<ResultSetHeader>("UPDATE users SET password = ? WHERE id = ?", [newPassword, userId]);
    },

    async updateUserName(newUsername: string, userId: number): Promise<ResultSetHeader> {
        const [result] = await db.query<ResultSetHeader>("UPDATE users SET username = ? WHERE id = ?", [newUsername, userId]);        
        return result;
    },

    // REGISTER USER DATA
    async registerUser(username: string, email: string, hashedPassword: string): Promise<ResultSetHeader> {
        const [result] = await db.query<ResultSetHeader>("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword]);
        return result;
    },

    async registerGoogleUser(name: string, email: string, googleId: string): Promise<ResultSetHeader> {
        const [result] = await db.query<ResultSetHeader>("INSERT INTO users (username, email, google_id, password) VALUES (?, ?, ?, ?)", [name, email, googleId, null]);
        return result;
    },

    // PASSWORD RESET
    async logPasswordResetRequest(userId: number, token: string, expireDate: string): Promise<void> {
        await db.query(`INSERT INTO password_reset_requests (user_id, token_hash, expires_at) VALUES (?, ?, ?)`, [userId, token, expireDate]);
    },

    async getPasswordResetRequest(token: string): Promise<PasswordResetTypes[]> {
        const [rows] = await db.query<PasswordResetTypes[]>(`SELECT * FROM password_reset_requests WHERE token_hash = ?  AND expires_at > NOW()  AND used_at IS NULL`, [token]);
        return rows;
    },

    async resetUserPasswordTransaction(userId: number, requestId: number, password: string): Promise<void> {
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();
            await conn.query("UPDATE users SET password = ? WHERE id = ?", [password, userId]);
            await conn.query("UPDATE password_reset_requests SET used_at = NOW() WHERE id = ?", [requestId]);
            await conn.commit();
        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        } 
    },
}