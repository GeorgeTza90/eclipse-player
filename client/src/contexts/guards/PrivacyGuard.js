import { useEffect, useRef } from "react";
import { useAuth } from "../AuthContextWeb";
import { useLibrary } from "../LibraryContextWeb";
import { useAudio } from "../AudioContextWeb";

const PrivacyGuard = () => {
    const { priv_u } = useAuth();
    const { privateAlbums } = useLibrary();    
    const { playlist, stop, setCurrentSong, setPlaylist, setPlaylistName } = useAudio();
    const wasPrivUserRef = useRef(priv_u);

    useEffect(() => {
        const justLostAccess = wasPrivUserRef.current && !priv_u;
        wasPrivUserRef.current = priv_u;

        if (!justLostAccess) return;

        const privateAlbumNames = new Set(privateAlbums.map(s => s.album));
        const playlistHasPrivateContent = playlist.some(s => privateAlbumNames.has(s.album));

        if (playlistHasPrivateContent) {
            stop();
            setCurrentSong(null);
            setPlaylist([]);
            setPlaylistName("");            
        }
    }, [priv_u]);

    return null;
};

export default PrivacyGuard;