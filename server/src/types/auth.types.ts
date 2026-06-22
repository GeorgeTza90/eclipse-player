import { RowDataPacket } from "mysql2";
import { Request } from "express";

export interface User extends RowDataPacket {
    id: number;
    username: string;
    email: string;
    premium: boolean;
    private: boolean;
    google_id: string;
}

export interface User extends RowDataPacket {
    id: number;
    username: string;
    email: string;
    premium: boolean;
    private: boolean;
    google_id: string;
}

export interface JwtUser {
    id: number;
}

export interface AuthenticatedRequest extends Request {
    user: JwtUser;
}

export interface PasswordResetTypes extends RowDataPacket {
    id: number;
    user_id: number;
    token_hash: string;
    expires_at: Date;
    used_at: Date;
}