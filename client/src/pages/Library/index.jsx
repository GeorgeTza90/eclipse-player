import Circle from "../../components/ui/Circle";
import LibraryScreen from "../../components/library/LibraryScreen";
import { useIsMobile } from "../../hooks/useIsMobile";
import MiniPlayer from "../../components/player/MiniPlayer";
import { useAuth } from "../../contexts/AuthContextWeb";
import { useAudio } from "../../contexts/AudioContextWeb";
import { useState } from "react";

function Library() {
    const isMobile = useIsMobile();
    const { user, token } = useAuth();
    const { currentSong, volume } = useAudio();
    const shadowColor = currentSong?.averageColor ?? "#bebebe";

    return (<>
        <div id="heading" style={{ display: "flex", justifyContent: "center" }}>
            <img src="/assets/images/LibraryLogo.png" style={{ position: 'absolute', width: 120, top: isMobile ? 10 : 55 }} />
            <Circle size={isMobile ? 400 : 1000} top={-isMobile ? -320 : -880} shadowColor={"#201f1fff"} intensity={volume * 30} color2="#0b0b0bff" color1="#1f1e1eff" />
            <LibraryScreen />
            {!isMobile && user && token && (<MiniPlayer />)}
        </div>
    </>);
}

export default Library;