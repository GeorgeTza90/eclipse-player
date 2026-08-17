import { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContextWeb";
import { useLibrary } from "@/contexts/LibraryContextWeb";
import { useAudio } from "@/contexts/AudioContextWeb";

const PrivacyGuard = (): null => {
    const { priv_u } = useAuth();
    const { privateAlbums } = useLibrary();
    const { playlist, stop, setCurrentSong, setPlaylist, setPlaylistName } = useAudio();

    const wasPrivUserRef = useRef<boolean>(priv_u);

    useEffect(() => {
        const justLostAccess = wasPrivUserRef.current && !priv_u;
        wasPrivUserRef.current = priv_u;
        if (!justLostAccess) return;

        const privateAlbumNames = new Set(privateAlbums.map((song) => song.album));
        const playlistHasPrivateContent = playlist.some((song) => privateAlbumNames.has(song.album));

        if (playlistHasPrivateContent) {
            stop();
            setCurrentSong(null);
            setPlaylist([]);
            setPlaylistName("");
        }
    }, [ priv_u, privateAlbums, playlist, stop, setCurrentSong, setPlaylist, setPlaylistName ]);

    return null;
};

export default PrivacyGuard;