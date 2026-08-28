// types/plays.types.ts
import { RowDataPacket } from "mysql2";

export interface Play extends RowDataPacket {
    id: number;
    user_id: number;
    song_id: number;
    played_at: Date;
    duration_listened_seconds: number;
    song_duration_seconds: number;
    completed: boolean;
}