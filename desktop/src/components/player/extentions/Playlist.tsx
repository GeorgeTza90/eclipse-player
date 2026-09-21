import { useEffect, useState } from "react";
import { useAudio } from "@/contexts/AudioContextWeb";
import { PlaylistProps } from "@/types/playlists.types.ts";
import PlaylistsongItem from "./playlist/PlaylistSongItem";
import NotLoggedIn from "@/components/ui/other/NotLoggedIn";
import { useAuth } from "@/contexts/AuthContextWeb";
import { useHeight } from "@/hooks/useScreen";
import { getHeightConfig } from "@/utils/sizeSwitch";
import styles from "./playlist.module.css"

const Playlist = ({ name = "Playlist" }: PlaylistProps) => {
    const { playlist, currentSong, playSong } = useAudio();
    const { user } = useAuth();
    const height = useHeight();

    const [currentName, setCurrentName] = useState(name);
    const [isLogin, setIsLogin] = useState(false)

    const { maxHeight } = getHeightConfig(height, isLogin);
    const ListStyle = { maxHeight: `${maxHeight}px` }

    useEffect(() => setCurrentName(name), [name]);
    useEffect(() => setIsLogin(user ? true : false), [user]);

    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>{currentName} - Playlist</h3>
            <div className={styles.list} style={ListStyle}>        
                {playlist && playlist.map((item) => (
                    <span key={item.id}>
                        <PlaylistsongItem item={item} currentSong={currentSong} onClick={() => playSong(item, playlist)}/>
                    </span>
                ))}
            </div>
            {!user && (<>
                <NotLoggedIn text={"to create your playlist"} />            
                <br/><br/><br/><br/>
            </>)}
            
        </div>
    );
}

export default Playlist;