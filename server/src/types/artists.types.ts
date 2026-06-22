import { RowDataPacket } from "mysql2";

export interface Artist extends RowDataPacket {
    id: string;
    name: string;
    description: string;
    media: any;
    image_url: string;
}