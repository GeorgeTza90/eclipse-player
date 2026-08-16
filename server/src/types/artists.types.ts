import { RowDataPacket } from "mysql2";

export interface ArtistMedia {
    mail?: string;
    twitter?: string;
    youtube?: string;
    bandcamp?: string;
    facebook?: string;
    instagram?: string;
}

export interface Artist extends RowDataPacket {
    id: string;
    name: string;
    description: string;
    media: ArtistMedia;
    image_url: string;
}