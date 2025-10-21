export interface Playlist {
    id: number;
    userId: number;
    title: string;
    description?: string;
    songCount: number;
}

export interface PlaylistListProps {
    token: string;
}

export interface PlaylistItemProps {
    playlist: Playlist;
    token: string;
    onDelete: () => void;
    onPress: (playlist: Playlist) => void;
}

export interface AddPlaylistModalProps {
    visible: boolean;
    onClose: () => void;
    token: string;
    onCreated: () => void;
}