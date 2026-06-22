import { RowDataPacket } from "mysql2";
import { Request } from "express";

export interface Presets extends RowDataPacket {
    id: number;
    user_id: number;
    title: string;
    preset?: [string];
    created_at: Date;
}