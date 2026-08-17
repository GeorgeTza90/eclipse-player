export interface ArtistMedia {
    mail?: string;
    twitter?: string;
    youtube?: string;
    bandcamp?: string;
    facebook?: string;
    instagram?: string;
}

export interface Artist {
    id: string;
    name: string;
    description: string;
    media?: ArtistMedia;
    image_url: string;
    photos?: string[];
}

export interface ArtistRole {
    name: string;
    role: "main" | "feat";
}

export interface GroupedArtists {
    mainArtists: string[];
    featArtists: string[];
}