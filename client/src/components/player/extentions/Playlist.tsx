import { useEffect, useMemo, useState } from "react";
import { useAudio } from "@/contexts/AudioContextWeb";
import { PlaylistProps } from "@/types/playlists.types.ts";
import PlaylistsongItem from "./playlist/PlaylistSongItem";
import styles from "./playlist.module.css";
import NotLoggedIn from "@/components/ui/other/NotLoggedIn";
import { useAuth } from "@/contexts/AuthContextWeb";
import { useHeight } from "@/hooks/useScreen";
import { getHeightConfig } from "@/utils/sizeSwitch";
import { useIsMobile } from "@/hooks/useIsMobile";
import ExtentionHeading from "../../ui/headers/ExtentionHeading";

const Playlist = ({ name = "Playlist" }: PlaylistProps) => {
  const { playlist, currentSong, playSong } = useAudio();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const height = useHeight();

  const [currentName, setCurrentName] = useState(useMemo(() => name, [name]));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [heading, setHeading] = useState("- Playlist");

  const { maxHeight } = getHeightConfig(height, isLoggedIn, isMobile);
  const ListStyle = { maxHeight: `${maxHeight}px` };

  useEffect(() => setCurrentName(name), [name]);
  useEffect(() => setIsLoggedIn(user ? true : false), [user]);
  useEffect(() => setHeading(`${currentName} - Playlist`), [currentName]);

  return (
    <div className={styles.container}>
      <ExtentionHeading text={heading} />
      <div className={styles.list} style={ListStyle}>
        {playlist &&
          playlist.map((item) => (
            <span key={item.id}>
              <PlaylistsongItem item={item} currentSong={currentSong} onClick={() => playSong(item, playlist)} />
            </span>
          ))}
      </div>
      {!user && <NotLoggedIn text={"to create your playlist"} />}
    </div>
  );
};

export default Playlist;
